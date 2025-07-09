import jwt from "jsonwebtoken";
import process from "process";
import AdminUser from "../models/admin.model.js";

export async function protect(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await AdminUser.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    next();
  } catch (err) {
    res.status(401).json({ error: err || "Token failed or expired" });
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}
