import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Label, TextInput, Button, Spinner, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Jika ada pesan dari halaman reset password
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  // Validasi email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi email sebelum submit
    if (!validateEmail(email)) {
      setMessage("Format email tidak valid");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message);
      setIsSuccess(res.ok);

      if (res.ok) {
        // Set timer untuk redirect ke login
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (err) {
      console.error(err);
      setMessage("Terjadi kesalahan server");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Flowbite
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Lupa Password</h1>
            {!isSuccess ? (
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="email" value="Email address" />
                  <TextInput id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@email.com" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Spinner size="sm" /> : "Kirim Link Reset Password"}
                </Button>
                {message && (
                  <Alert color={isSuccess ? "success" : "failure"} icon={HiInformationCircle}>
                    <span className="font-medium">{isSuccess ? "Sukses!" : "Error!"}</span> {message}
                    {isSuccess && <p className="mt-2 text-sm">Anda akan dialihkan ke halaman login dalam 5 detik...</p>}
                  </Alert>
                )}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Kembali ke{" "}
                  <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Login
                  </a>
                </p>
              </form>
            ) : (
              <div className="text-center">
                <Alert color="success" icon={HiInformationCircle}>
                  <span className="font-medium">Email terkirim!</span>
                  <p className="mt-2">Silakan cek email Anda untuk link reset password.</p>
                  <p className="mt-2">Anda akan dialihkan ke halaman login dalam 5 detik...</p>
                </Alert>
                <Button onClick={() => navigate("/login")} className="mt-4">
                  Kembali ke Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
