# Wedding Invitation

Production-ready MVP for the wedding invitation of Александр and Юлия.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Google Apps Script RSVP endpoint
- Static VPS deployment with Nginx

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Set the RSVP endpoint in `.env`:

```bash
VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run test
npm run lint
```

## Guest Personalization

Guests are configured in `src/content/guests.ts`.

To add a new guest, append a new object to the `guests` array:
```typescript
{
  slug: "new-guest",
  guestId: "guest-new-guest",
  displayName: "Имя Гостя",
  greeting: "Уважаемый Имя Гостя",
  inviteType: "single", // "single", "couple", "family", or "group"
  answerOptions: singleAnswerOptions,
}
```

Supported invitation URLs:

```text
/?g=ivanovy-a8f3
/i/ivanovy-a8f3
```

You can form personal links like:
`https://domain.com/i/ivanovy-a8f3`
`https://domain.com/?g=ivanovy-a8f3`

If the slug is unknown or invalid, the site falls back to the generic version:

```text
Дорогие гости
```
To test the fallback, navigate to an unknown slug, e.g. `http://localhost:4174/i/unknown`.

## RSVP

The RSVP form posts JSON to `VITE_RSVP_ENDPOINT` as `text/plain;charset=utf-8`, which works well with Google Apps Script deployments and avoids unnecessary preflight requirements.

The payload shape is:

```ts
type RsvpPayload = {
  guestId: string;
  slug: string;
  displayName: string;
  inviteType: InviteType;
  answerId: string;
  answerLabel: string;
  email?: string;
  plusOneName?: string;
  guestCount?: number;
  comment?: string;
  sourceUrl: string;
  userAgent: string;
  source: "wedding-invitation";
};
```

After a successful submit, the browser stores a local marker in `localStorage` to reduce accidental duplicate submissions from the same device.

## Google Apps Script

The deployable RSVP receiver is in `google-apps-script/rsvp.gs`.

Deploy steps:

1. Create or open the Google Sheet that should store RSVP answers.
2. Open Extensions -> Apps Script.
3. Paste `google-apps-script/rsvp.gs`.
4. Deploy as Web App.
5. Set access to the audience that should be allowed to submit the form.
6. Copy the Web App URL into `.env` as `VITE_RSVP_ENDPOINT`.

For a standalone Apps Script project, set Script Property `SPREADSHEET_ID` to the target spreadsheet ID. For a script bound to the spreadsheet, this property is optional.

## Images

Current MVP includes editorial SVG placeholders in `public/images`.

Replace or add production assets before launch:

- `public/images/couple.svg`
- `public/images/location.svg`
- `public/images/dress-palette.svg`
- `public/images/dress-examples.svg`
- `public/images/qr-gift.png`

The gift section tries `qr-gift.png` first and falls back to `qr-gift.svg` while the real QR image is not present.

## Build

```bash
npm run build
```

The static output is generated in `dist/`.

## VPS Deploy With Nginx

Example directory:

```text
/var/www/wedding
```

Build locally or on the server:

```bash
npm ci
npm run build
```

Copy `dist/` contents to the web root:

```bash
rsync -av --delete dist/ /var/www/wedding/
```

Example Nginx server block:

```nginx
server {
    listen 80;
    server_name wedding.example.com;

    root /var/www/wedding;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(?:css|js|svg|png|jpg|jpeg|webp|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        try_files $uri =404;
    }
}
```

    The `try_files` fallback is required for `/i/:slug` links.

## Deploy to Vercel

1. Install dependencies:
   ```bash
   npm install
   ```
2. Test the build locally:
   ```bash
   npm run build
   ```
3. Install Vercel CLI (if not installed):
   ```bash
   npm i -g vercel
   ```
4. Log in to Vercel:
   ```bash
   vercel login
   ```
5. Link project and deploy to preview:
   ```bash
   vercel
   ```
6. Deploy to production:
   ```bash
   vercel --prod
   ```

**Important:** You must add the `VITE_RSVP_ENDPOINT` environment variable in the Vercel Dashboard.
Go to your Project -> Settings -> Environment Variables, add `VITE_RSVP_ENDPOINT` with your Google Apps Script URL, and then trigger a new deployment.

## Tests

This MVP includes unit tests for:

- slug parsing
- guest fallback
- RSVP validation

Run:

```bash
npm run test
```

## TODO

- Add Playwright E2E tests for personalized links, RSVP conditional fields, success state, and accordion accessibility.
- Replace placeholder SVG illustrations with final production photos.
- Add the real `public/images/qr-gift.png`.
