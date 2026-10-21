export default async function handler(req, res) {
  const json = (data, status = 200) => {
    res.statusCode = status;
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.setHeader("cache-control", "no-store");
    res.end(JSON.stringify(data));
  };

  const secret = process.env.CRON_SECRET;
  const authorization = req.headers.authorization;
  if (secret && authorization !== `Bearer ${secret}`) {
    return json({ error: "Unauthorized" }, 401);
  }

  // Status endpoint only: no signals are fabricated from incomplete data.
  // A persistent tick sampler and notification provider still need implementing.
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
