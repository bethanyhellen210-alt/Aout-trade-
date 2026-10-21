# ELISY254 Live Signal Scanner

A Vercel-hosted starter for Deriv live-market analysis. **This repository is not yet a complete live signal engine and does not currently send WhatsApp messages.** Do not interpret the dashboard's strategy labels as working signals.

## Requested market coverage and contracts

Market groups:
- Deriv Jump indices returned by the active-symbols API.
- Deriv Volatility indices with 1-second variants returned by the active-symbols API.

Contract strategies:
- Over 2, Over 3, Over 4
- Under 7, Under 8
- Matches (candidate digit 0–9)
- Even
- Odd

The strategy engine still needs implementation and testing against real tick streams before it may issue signals. It must never invent frequencies, confidence, entries, or outcomes.

## Deploy to Vercel

1. Import `bethanyhellen210-alt/Aout-trade-` into Vercel.
2. Add `DERIV_APP_ID` as a Vercel environment variable using your registered Deriv application ID.
3. Redeploy, then open the deployment and check the market lookup. The dashboard fetches active symbols from Deriv; if the request fails, check the App ID and browser/network errors.
4. The current `/api/scan` endpoint is only a configuration/status endpoint. The five-minute cron entry does not create a live tick sampler or send signals.

## WhatsApp group notifications: important limitation

The current code has **no WhatsApp sender, webhook, message queue, or signal engine**. Adding a WhatsApp group link, phone number, or group-admin status is not sufficient to let Vercel post to a normal WhatsApp group.

The official WhatsApp Groups API is restricted and is not a general-purpose bridge to an arbitrary existing personal group. Check current eligibility and supported group workflows directly in the [WhatsApp Business Developer Hub](https://whatsappbusiness.com/developers/developer-hub/) and Meta's Groups API documentation before building against it. Published prerequisites include Official Business Account status and a high business-initiated messaging limit; the business number must use Cloud API and webhooks must be configured.

If Meta confirms that your account qualifies, the implementation will need:
- Meta app and WhatsApp Business Platform setup with approved Groups API access.
- A Cloud API business phone number, access token and phone-number ID, stored only in Vercel server-side environment variables.
- The API-supported group workflow and group identifier returned by Meta; do not assume your existing group can be targeted.
- A webhook endpoint for group lifecycle/participant and delivery events, with verification and signature checks.
- A server-side message sender with retry limits, duplicate protection and delivery logging.
- A real signal engine and persistent tick store, plus a rule to send only on a new validated signal.

Never commit tokens or credentials to GitHub or expose them in browser code. Do not use unofficial WhatsApp Web automation; it can break or put the account at risk.

## Practical alternative if you do not qualify

Use a Telegram bot in your group, or use the official WhatsApp Cloud API to send permitted individual messages to recipients who have opted in. Telegram delivery still requires a server-side sender and credentials; it is not implemented yet.

## Required next engineering tasks

1. Build a reliable Deriv WebSocket tick collector and persistent rolling tick store. A Vercel function invocation cannot safely be assumed to keep an in-memory sample between scheduled runs.
2. Implement and test exact entry rules for Over 2/3/4, Under 7/8, Matches, Even and Odd, with minimum sample sizes and duplicate-signal suppression.
3. Implement a server-side notification provider (WhatsApp Groups API only if approved, otherwise an officially supported alternative).
4. Add secure webhook verification, retry/backoff, health checks and delivery logs.
5. Test with real public market data in signal-only mode before enabling notifications.

## Environment variables

Currently used:
- `DERIV_APP_ID` — Deriv application ID.

Status endpoint checks:
- `CRON_SECRET` — secret for scheduled endpoint access.
- `NOTIFICATION_MODE` — currently only a status/configuration marker; it does not activate message delivery.

Future WhatsApp integration will need credentials and IDs supplied by Meta, but exact variable names should be finalized only when the approved API workflow is selected. Keep every secret server-side.
