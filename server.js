const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const uploadRoutes = require("./routes/upload.routes");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "development-only-change-me";

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};

  // Demo credentials for the assignment's local verification workflow.
  if (username !== "ada" || password !== "password") {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  return res.json({ token, tokenType: "Bearer", expiresIn: 3600 });
});

app.use("/api", uploadRoutes);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Upload server listening on port ${PORT}`);
});

module.exports = app;
