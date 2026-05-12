import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

import { generateAccessToken, generateRefreshToken } from "../utils/tokens.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "No credential provided" });
    }

    console.log("🔥 CREDENTIAL:", credential);

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    console.log("🔥 GOOGLE PAYLOAD:", payload);

    if (!payload?.email) {
      return res.status(403).json({ message: "No email from Google" });
    }

    if (payload.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = {
      email: payload.email,
      role: "admin",
    };

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.json({
      accessToken,
      refreshToken,
      user,
    });
  } catch (err) {
    console.log("❌ GOOGLE LOGIN ERROR:", err);

    return res.status(401).json({
      message: "Invalid Google token",
      error: err.message,
    });
  }
};

// REFRESH TOKEN
export const refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, process.env.REFRESH_SECRET);

    const newAccessToken = generateAccessToken({
      email: user.email,
      role: user.role,
    });

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.log("❌ REFRESH ERROR:", err);
    return res.sendStatus(403);
  }
};
