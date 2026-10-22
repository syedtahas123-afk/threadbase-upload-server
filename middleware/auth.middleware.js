const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "development-only-change-me";

function verifyToken(req, res, next) {
  const authorization = req.headers.authorization || "";
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Authorization bearer token required" });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (_error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = { verifyToken };
