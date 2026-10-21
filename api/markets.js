export default function handler(req, res) {
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: "Method not allowed" }));
  }
  const appId = process.env.DERIV_APP_ID || "";
  res.statusCode = appId ? 200 : 503;
  return res.end(JSON.stringify({
    appId,
    status: appId ? "ready_for_live_market_lookup" : "missing_deriv_app_id",
    marketGroups: ["Jump indices", "Volatility 1-second indices"],
    strategies: ["OVER_2", "OVER_3", "OVER_4", "UNDER_7", "UNDER_8", "MATCHES", "EVEN", "ODD"]
  }));
}
