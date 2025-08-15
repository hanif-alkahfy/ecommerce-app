import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Spinner, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  // Get token from URL
  const token = searchParams.get("token");

  useEffect(() => {
    // Cek keberadaan token dan validitasnya
    const validateToken = async () => {
      if (!token) {
        console.log("Token tidak ditemukan di URL");
        setMessage("Tidak ada token reset password yang valid. Silakan request ulang melalui halaman forgot password.");
        setIsValidToken(false);
        setTimeout(() => {
          navigate("/forgot-password", {
            state: { message: "Silakan masukkan email Anda untuk mendapatkan link reset password baru" },
          });
        }, 3000);
        return;
      }

      setLoading(true);
      try {
        // Validasi token di backend
        const res = await fetch(`http://localhost:5000/api/auth/validate-reset-token?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          console.log("Token valid", data);

          // Check if token is near expiry (less than 2 minutes)
          const expiresIn = new Date(data.expiresIn);
          const now = new Date();
          const timeLeft = expiresIn - now;

          if (timeLeft < 120000) {
            // 2 minutes in milliseconds
            setMessage("Token akan segera kadaluarsa. Silakan request ulang reset password.");
            setTimeout(() => {
              navigate("/forgot-password");
            }, 3000);
            return;
          }

          setIsValidToken(true);
          setForm((prev) => ({ ...prev, userId: data.userId }));
        } else {
          console.log("Token tidak valid:", data.message);
          setMessage(data.message || "Token tidak valid");
          setTimeout(() => {
            navigate("/forgot-password");
          }, 3000);
        }
      } catch (err) {
        console.error("Error validating token:", err);
        setMessage("Terjadi kesalahan saat memvalidasi token");
        setTimeout(() => {
          navigate("/forgot-password");
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token, navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi password match
    if (form.password !== form.confirmPassword) {
      setMessage("Password tidak cocok");
      return;
    }

    // Validasi password length
    if (form.password.length < 8) {
      setMessage("Password minimal 8 karakter");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword: form.password,
        }),
      });

      const data = await res.json();
      setMessage(data.message);
      setIsSuccess(res.ok);

      if (res.ok) {
        // Redirect ke login setelah 3 detik
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setMessage("Terjadi kesalahan server");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <section className="w-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Flowbite
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Reset Password</h1>

            {!isValidToken && message && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Error!</span> {message}
                <p className="mt-2 text-sm">Anda akan dialihkan ke halaman forgot password...</p>
              </Alert>
            )}

            {isValidToken && !isSuccess && (
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="password" value="Password Baru" />
                  <TextInput id="password" type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" value="Konfirmasi Password" />
                  <TextInput id="confirmPassword" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Spinner size="sm" /> : "Reset Password"}
                </Button>
                {message && (
                  <Alert color={isSuccess ? "success" : "failure"} icon={HiInformationCircle}>
                    <span className="font-medium">{isSuccess ? "Sukses! " : "Error! "}</span>
                    {message}
                  </Alert>
                )}
              </form>
            )}

            {isSuccess && (
              <div className="text-center">
                <Alert color="success" icon={HiInformationCircle}>
                  <span className="font-medium">Berhasil!</span>
                  <p>{message}</p>
                  <p className="mt-2 text-sm">Anda akan dialihkan ke halaman login dalam beberapa detik...</p>
                </Alert>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
