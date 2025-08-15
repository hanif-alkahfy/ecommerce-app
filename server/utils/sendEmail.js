import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // bisa diganti sesuai provider
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // email pengirim
        pass: process.env.EMAIL_PASS, // password / app password
      },
    });

    const info = await transporter.sendMail({
      from: `"Ecommerce App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Email error:", err);
    throw err;
  }
};
