import User from "../models/user.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Cek email sudah ada atau belum
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email sudah terdaftar" });

    // 2. Buat user baru
    const newUser = new User({ name, email, password });
    await newUser.save();

    // 3. Generate email verification token (JWT)
    const emailToken = jwt.sign(
      { userId: newUser._id },
      process.env.EMAIL_SECRET,
      { expiresIn: "24h" } // token expire 24 jam
    );

    // 4. Buat link verifikasi (belum dikirim email)
    const verifyLink = `${process.env.CLIENT_URL}/verify-email?token=${emailToken}`;

    // di register, setelah generate verifyLink
    await sendEmail(
      email,
      "Verify your email",
      `<p>Click <a href="${verifyLink}">here</a> to verify your email.</p>`
    );

    // 5. Response
    res.status(201).json({
      message: "Register berhasil, silakan verifikasi email Anda",
      user: { id: newUser._id, name, email, role: newUser.role },
      verifyLink // ini sementara untuk testing, nanti diganti kirim email
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Endpoint verifikasi email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).send("Token tidak ditemukan");

    const decoded = jwt.verify(token, process.env.EMAIL_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).send("User tidak ditemukan");

    if (user.emailVerified) return res.send("Email sudah diverifikasi sebelumnya");

    user.emailVerified = true;
    await user.save();

    res.send("Email berhasil diverifikasi. Silakan login.");
  } catch (err) {
    console.error(err);
    res.status(400).send("Token tidak valid atau sudah kadaluwarsa");
  }
};
