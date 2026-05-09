import type { AnswerOption, GuestConfig, RsvpFormState, ValidationErrors } from "../types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxGuestCount = 12;

export function findAnswerOption(
  guest: GuestConfig,
  answerOptionId: string,
): AnswerOption | undefined {
  return guest.answerOptions.find((option) => option.id === answerOptionId);
}

export function validateRsvpForm(
  guest: GuestConfig,
  formState: RsvpFormState,
): ValidationErrors {
  const errors: ValidationErrors = {};
  const selectedOption = findAnswerOption(guest, formState.answerOptionId);

  if (!selectedOption) {
    errors.answerOptionId = "Выберите один из вариантов ответа.";
    return errors;
  }

  if (selectedOption.requiresEmail) {
    const email = formState.email.trim();

    if (!email) {
      errors.email = "Укажите email для связи.";
    } else if (!emailPattern.test(email)) {
      errors.email = "Проверьте формат email.";
    }
  }

  if (selectedOption.requiresPlusOneName && !formState.plusOneName.trim()) {
    errors.plusOneName = "Укажите имя гостя +1.";
  }

  if (selectedOption.requiresGuestCount) {
    const parsedCount = Number(formState.guestCount);

    if (!formState.guestCount.trim()) {
      errors.guestCount = "Укажите количество гостей.";
    } else if (!Number.isInteger(parsedCount) || parsedCount < 1 || parsedCount > maxGuestCount) {
      errors.guestCount = `Укажите целое число от 1 до ${maxGuestCount}.`;
    }
  }

  return errors;
}

export function hasValidationErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
