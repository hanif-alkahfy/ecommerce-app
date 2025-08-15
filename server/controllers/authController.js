import User from "../models/user.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Endpoint untuk register user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validasi input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Nama, email, dan password harus diisi",
      });
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Format email tidak valid",
      });
    }

    // Validasi panjang nama
    if (name.length < 3 || name.length > 50) {
      return res.status(400).json({
        message: "Nama harus antara 3-50 karakter",
      });
    }

    // Validasi kekuatan password
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password minimal 8 karakter",
      });
    }

    // Cek email sudah terdaftar
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Membuat user baru
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Validasi environment variables
    if (!process.env.EMAIL_SECRET || !process.env.CLIENT_URL) {
      console.error("Missing required environment variables");
      return res.status(500).json({
        message: "Konfigurasi server belum lengkap",
      });
    }

    // Membuat token verifikasi
    const emailToken = jwt.sign({ userId: newUser._id }, process.env.EMAIL_SECRET, { expiresIn: "24h" });

    const verifyLink = `${process.env.CLIENT_URL}/verify-email?token=${emailToken}`;

    // Kirim email verifikasi
    try {
      await sendEmail(email, "Verifikasi Email Anda", `<p>Klik <a href="${verifyLink}">di sini</a> untuk verifikasi email Anda.</p>`);
    } catch (emailError) {
      console.error("Error sending verification email:", emailError);
      return res.status(500).json({
        message: "Gagal mengirim email verifikasi, silakan coba lagi",
      });
    }

    res.status(201).json({
      message: "Register berhasil, silakan verifikasi email Anda",
      user: { id: newUser._id, name, email, role: newUser.role },
      verifyLink,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Endpoint verifikasi email
export const verifyEmail = async (req, res) => {
  try {
    // Validasi token
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({
        message: "Token verifikasi tidak ditemukan",
      });
    }

    // Validasi EMAIL_SECRET
    if (!process.env.EMAIL_SECRET) {
      console.error("Missing EMAIL_SECRET environment variable");
      return res.status(500).json({
        message: "Konfigurasi server belum lengkap",
      });
    }

    // Verifikasi token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.EMAIL_SECRET);
    } catch (tokenError) {
      if (tokenError.name === "TokenExpiredError") {
        return res.status(400).json({
          message: "Token verifikasi sudah kadaluwarsa. Silakan request ulang verifikasi email",
        });
      }
      return res.status(400).json({
        message: "Token verifikasi tidak valid",
      });
    }

    // Cari user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    // Cek status verifikasi
    if (user.emailVerified) {
      return res.status(200).json({
        message: "Email sudah diverifikasi sebelumnya",
      });
    }

    // Update status verifikasi
    user.emailVerified = true;
    await user.save();

    // Response sukses
    res.status(200).json({
      message: "Email berhasil diverifikasi. Silakan login.",
      verified: true,
    });
  } catch (err) {
    console.error("Error during email verification:", err);
    res.status(500).json({
      message: "Terjadi kesalahan saat memverifikasi email",
    });
  }
};

// Endpoint login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password harus diisi",
      });
    }

    // Cek email terdaftar
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    // Cek status verifikasi email
    if (!user.emailVerified) {
      return res.status(403).json({
        message: "Email belum diverifikasi. Silakan cek email Anda untuk link verifikasi",
      });
    }

    // Verifikasi password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    // Validasi JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error("Missing JWT_SECRET environment variable");
      return res.status(500).json({
        message: "Konfigurasi server belum lengkap",
      });
    }

    // Generate access token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Generate refresh token
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Update user data
    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save();

    // Send response
    res.status(200).json({
      message: "Login berhasil",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Terjadi kesalahan saat login",
    });
  }
};

// Endpoint logout
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Cari user berdasarkan refresh token
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(200).json({ message: "Logout berhasil" });
    }

    // Hapus refresh token
    user.refreshToken = null;
    await user.save();

    res.status(200).json({ message: "Logout berhasil" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Terjadi kesalahan saat logout" });
  }
};

// Endpoint refresh token
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token diperlukan" });
    }

    // Cari user dengan refresh token yang valid
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(401).json({ message: "Refresh token tidak valid" });
    }

    // Verifikasi refresh token
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

      // Generate access token baru
      const newAccessToken = jwt.sign(
        {
          userId: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        accessToken: newAccessToken,
      });
    } catch (err) {
      // Hapus refresh token jika expired
      user.refreshToken = null;
      await user.save();
      return res.status(401).json({ message: "Refresh token expired, silakan login kembali" });
    }
  } catch (err) {
    console.error("Refresh token error:", err);
    res.status(500).json({ message: "Terjadi kesalahan saat memperbarui token" });
  }
};

// Endpoint forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email harus diisi" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email tidak terdaftar" });
    }

    // Generate reset token
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // Simpan reset token ke database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 menit
    await user.save();

    // Kirim email reset password
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    await sendEmail(email, "Reset Password", `<p>Klik <a href="${resetLink}">di sini</a> untuk reset password Anda. Link ini berlaku selama 15 menit.</p>`);

    res.status(200).json({
      message: "Link reset password telah dikirim ke email Anda",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Terjadi kesalahan saat memproses forgot password" });
  }
};

// Endpoint untuk validasi token reset password
export const validateResetToken = async (req, res) => {
  try {
    const { token } = req.query;
    console.log("Validating reset token:", token);

    if (!token) {
      console.log("No token provided");
      return res.status(400).json({
        message: "Token tidak ditemukan",
      });
    }

    // Cek user dengan token yang valid
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    console.log("User found:", user ? "Yes" : "No");
    console.log("Current time:", new Date());
    console.log("Token expires:", user?.resetPasswordExpires);

    if (!user) {
      return res.status(400).json({
        message: "Token tidak valid atau sudah kadaluarsa",
      });
    }

    res.status(200).json({
      message: "Token valid",
      userId: user._id, // Include user ID for additional validation
      expiresIn: user.resetPasswordExpires,
    });
  } catch (err) {
    console.error("Validate token error:", err);
    res.status(500).json({
      message: "Terjadi kesalahan saat validasi token",
    });
  }
};

// Endpoint reset password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        message: "Token dan password baru diperlukan",
      });
    }

    // Validasi password baru
    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "Password minimal 8 karakter",
      });
    }

    // Cari user dengan token reset yang valid
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Token reset password tidak valid atau sudah expired",
      });
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      message: "Password berhasil direset, silakan login dengan password baru",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({
      message: "Terjadi kesalahan saat reset password",
    });
  }
};
