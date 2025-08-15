import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Memverifikasi...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("Token tidak ditemukan");
      return;
    }

    axios
      .get(`http://localhost:5000/api/auth/verify-email?token=${token}`)
      .then((res) => {
        setStatus("Email berhasil diverifikasi! 🎉");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((err) => {
        console.error(err);
        setStatus("Verifikasi gagal ❌");
      });
  }, [searchParams, navigate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="p-6 bg-white shadow-md rounded">
        <h1 className="text-xl font-bold">{status}</h1>
      </div>
    </div>
  );
}
