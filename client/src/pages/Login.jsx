import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Label, TextInput, Checkbox, Button, Spinner, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function Login() {
  const navigate = useNavigate();

  // Cek stored credentials saat komponen mount
  useEffect(() => {
    const storedCredentials = localStorage.getItem("rememberedCredentials");
    if (storedCredentials) {
      const { email, password } = JSON.parse(storedCredentials);
      setForm((prev) => ({
        ...prev,
        email,
        password,
        remember: true,
      }));
    }
  }, []);
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Simpan token di localStorage
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        // Jika remember me dicentang, simpan credentials
        if (form.remember) {
          localStorage.setItem(
            "rememberedCredentials",
            JSON.stringify({
              email: form.email,
              password: form.password,
            })
          );
        } else {
          // Jika tidak dicentang, hapus remembered credentials
          localStorage.removeItem("rememberedCredentials");
        }

        // Simpan user data
        localStorage.setItem("user", JSON.stringify(data.user));

        setMessage("Login berhasil! Mengalihkan...");

        // Redirect ke homepage setelah login
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Flowbite
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email" value="Your email" />
                <TextInput id="email" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="password" value="Password" />
                <TextInput id="password" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <Checkbox id="remember" name="remember" checked={form.remember} onChange={handleChange} />
                  <Label htmlFor="remember" className="ml-3 text-sm text-gray-500 dark:text-gray-300">
                    Remember me
                  </Label>
                </div>
                <a href="/forgot-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Sign in"}
              </Button>

              {message && (
                <Alert color={message.includes("berhasil") ? "success" : "failure"} icon={HiInformationCircle} className="mt-2">
                  <span className="font-medium">{message.includes("berhasil") ? "Sukses! " : "Error! "}</span>
                  {message}
                </Alert>
              )}

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
