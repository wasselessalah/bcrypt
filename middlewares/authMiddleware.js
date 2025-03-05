const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "No Access Token" });
  }
};

const verifyTokenAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins Only" });
    }
    next();
  } catch {
    res.status(401).json({ message: "No Access Token" });
  }
};

module.exports = { verifyToken,verifyTokenAdmin };
