var SHEET_NAME = "rsvp";
var SPREADSHEET_ID_PROPERTY = "SPREADSHEET_ID";
var HEADERS = [
  "timestamp",
  "guestId",
  "slug",
  "displayName",
  "answerId",
  "answerLabel",
  "email",
  "plusOneName",
  "guestCount",
  "comment",
  "sourceUrl",
  "userAgent",
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  var hasLock = false;

  try {
    lock.waitLock(10000);
    hasLock = true;

    var payload = parseJsonBody_(e);
    var validation = validatePayload_(payload);

    if (!validation.ok) {
      return createJsonResponse_({
        ok: false,
        error: validation.error,
      });
    }

    var sheet = getOrCreateRsvpSheet_();
    sheet.appendRow([
      new Date(),
      sanitizeString_(payload.guestId),
      sanitizeString_(payload.slug),
      sanitizeString_(payload.displayName),
      sanitizeString_(payload.answerId),
      sanitizeString_(payload.answerLabel),
      sanitizeString_(payload.email),
      sanitizeString_(payload.plusOneName),
      normalizeGuestCount_(payload.guestCount),
      sanitizeString_(payload.comment),
      sanitizeString_(payload.sourceUrl),
      sanitizeString_(payload.userAgent),
    ]);

    return createJsonResponse_({
      ok: true,
    });
  } catch (error) {
    console.error("RSVP submission failed: " + getSafeErrorMessage_(error));

    return createJsonResponse_({
      ok: false,
      error: "Internal server error.",
    });
  } finally {
    if (hasLock) {
      lock.releaseLock();
    }
  }
}

function parseJsonBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("Missing request body.");
  }

  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    throw new Error("Invalid JSON body.");
  }
}

function validatePayload_(payload) {
  if (!payload || typeof payload !== "object") {
    return validationError_("Invalid payload.");
  }

  var requiredFields = ["guestId", "slug", "displayName", "answerId", "answerLabel"];

  for (var i = 0; i < requiredFields.length; i += 1) {
    var fieldName = requiredFields[i];

    if (!isNonEmptyString_(payload[fieldName])) {
      return validationError_("Missing required field: " + fieldName + ".");
    }
  }

  if (payload.email !== undefined && payload.email !== null && payload.email !== "") {
    if (typeof payload.email !== "string" || !isValidEmail_(payload.email)) {
      return validationError_("Invalid email format.");
    }
  }

  if (
    payload.guestCount !== undefined &&
    payload.guestCount !== null &&
    payload.guestCount !== "" &&
    !isValidGuestCount_(payload.guestCount)
  ) {
    return validationError_("Invalid guestCount.");
  }

  return {
    ok: true,
  };
}

function validationError_(message) {
  return {
    ok: false,
    error: message,
  };
}

function getOrCreateRsvpSheet_() {
  var spreadsheet = getSpreadsheet_();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    return sheet;
  }

  ensureHeaders_(sheet);
  return sheet;
}

function getSpreadsheet_() {
  var spreadsheetId = PropertiesService.getScriptProperties().getProperty(SPREADSHEET_ID_PROPERTY);

  if (spreadsheetId) {
    return SpreadsheetApp.openById(spreadsheetId);
  }

  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  if (!activeSpreadsheet) {
    throw new Error(
      "Spreadsheet is not configured. Bind the script to a spreadsheet or set Script Property SPREADSHEET_ID."
    );
  }

  return activeSpreadsheet;
}

function ensureHeaders_(sheet) {
  var range = sheet.getRange(1, 1, 1, HEADERS.length);
  var currentHeaders = range.getValues()[0];
  var shouldRewriteHeaders = false;

  for (var i = 0; i < HEADERS.length; i += 1) {
    if (currentHeaders[i] !== HEADERS[i]) {
      shouldRewriteHeaders = true;
      break;
    }
  }

  if (shouldRewriteHeaders) {
    range.setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function createJsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function isNonEmptyString_(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidGuestCount_(value) {
  var guestCount = Number(value);
  return Number.isInteger(guestCount) && guestCount >= 1 && guestCount <= 12;
}

function normalizeGuestCount_(value) {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  return Number(value);
}

function sanitizeString_(value) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

function getSafeErrorMessage_(error) {
  if (error && error.message) {
    return String(error.message);
  }

  return "Unknown error.";
}
