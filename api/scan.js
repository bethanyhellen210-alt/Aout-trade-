const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
});

export default async function handler(request) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");
  if (secret && authorization !== `Bearer ${secret}`) {
    return json({ error: "Unauthorized" }, 401);
  }

  // This endpoint is intentionally a status/check endpoint until a persistent
  // tick sampler and supported notification destination are configured.
  // Vercel serverless instances cannot reliably retain a rolling tick window
  // between invocations; do not fabricate a signal from incomplete data.
  const missing = [];
  if (!process.env.DERIV_APP_ID) missing.push("DERIV_APP_ID");
  if (!process.env.CRON_SECRET) missing.push("CRON_SECRET");
  if (!process.env.NOTIFICATION_MODE) missing.push("NOTIFICATION_MODE");

  return json({
    app: "ELISY254 Live Signal Scanner",
    status: missing.length ? "needs_configuration" : "configured_but_sampler_required",
    missing,
    strategies: ["OVER_2", "UNDER_7", "EVEN", "MATCHES"],
    message: "No entry signal is issued until a complete live tick window passes the configured strategy filters."
  });
}
