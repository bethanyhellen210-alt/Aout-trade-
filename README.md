# ELISY254 Live Signal Scanner

Vercel scaffold for live Deriv tick analysis and signal notifications. It is configured around these strategies:

- **Over 2** — only signal when the user's defined live digit-frequency/trigger conditions pass.
- **Under 7** — only signal when the user's defined live digit-frequency/trigger conditions pass.
- **Even** — only signal when the measured even-digit condition passes.
- **Matches** — identify a candidate digit only when its measured frequency rule passes.

The app must not invent tick statistics, entry points, confidence, or results. A strategy needs a complete rolling sample before it can issue a signal. This initial repository scaffold does not yet implement the persistent rolling sampler or send notifications.

## Deploy to Vercel

1. Import this repository into Vercel.
2. Add environment variables:
   - `DERIV_APP_ID` — your registered Deriv application ID.
   - `CRON_SECRET` — a long random secret used to protect the scheduled endpoint.
   - `NOTIFICATION_MODE` — choose a supported destination after configuring its credentials.
3. Deploy. Vercel Cron is available according to the project's Vercel plan and deployment settings.

## WhatsApp group delivery

Do not put WhatsApp credentials in browser code or commit them to GitHub. The standard WhatsApp Business Cloud API does not generally provide arbitrary group-message sending for ordinary integrations. Group support is restricted/eligibility-dependent, so verify that Meta has enabled the Groups API for your specific business account before building around it. Do not use unofficial WhatsApp Web automation that risks account restrictions.

If group delivery is not enabled for your account, use an officially supported alternative (for example, WhatsApp Cloud API to opted-in individual recipients, or a Telegram group bot). A WhatsApp group URL or group name alone is not a valid API destination.

## Important status

This is a scaffold, not a completed live signal engine. It deliberately returns configuration status instead of claiming to analyze live ticks. To complete it safely, add a reliable rolling tick store, implement and test the exact percentage thresholds, then connect a supported notification provider using server-side environment variables.
