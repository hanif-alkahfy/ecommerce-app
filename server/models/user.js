import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isBlocked: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false }, // untuk email verification
    refreshToken: { type: String, default: null }, // untuk menyimpan refresh token aktif
    profileImage: { type: String, default: null }, // URL foto profil
    lastLogin: { type: Date, default: null },
    addresses: [
      {
        label: { type: String, default: "" }, // contoh: "Rumah", "Kantor"
        address: { type: String, default: "" },
        city: { type: String, default: "" },
        postalCode: { type: String, default: "" },
        phone: { type: String, default: "" },
      },
    ], // ditambahkan nanti melalui update profile
  },
  { timestamps: true }
);

// Hash password sebelum save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method untuk compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
