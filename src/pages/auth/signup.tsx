"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SuccessPopup from "@/components/SuccessPopup";
import { SIGNUP_API } from "@/constants/api";
import { Eye, EyeOff } from "lucide-react";
import { getWithExpiry } from "@/utils/storage";

export default function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    user_name: "",
    phone_number: "",
  });

  const [showPassword, setShowPassword] = useState(false); // added for eye toggle
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const token = getWithExpiry("authToken");
    console.log("Token from localStorage:", token);
    if (token) {
      router.replace("/dashboard"); // redirect to home if already logged in
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(SIGNUP_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setSuccessMessage(data.message || "Signup successful! Please verify your email.");
      setShowSuccessPopup(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to login page on popup OK
  const handlePopupOk = () => {
    setShowSuccessPopup(false);
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 dark:bg-bg-dark transition-colors">
      {showSuccessPopup ? (
        <SuccessPopup
          message={successMessage}
          onOk={handlePopupOk}
          buttonText="Okay"
        />
      ) : (
        <div className="bg-primary-100 dark:bg-surface-dark shadow-lg rounded-xl p-8 w-full max-w-md border border-primary-200 dark:border-primary-700">
          <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-6 text-center">
            Sign Up
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-primary-700 dark:text-primary-300 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-primary-300 dark:border-primary-600 
                         bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-primary-100 focus:outline-none 
                         focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-primary-700 dark:text-primary-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-primary-300 dark:border-primary-600 
                         bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-primary-100 focus:outline-none 
                         focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-primary-700 dark:text-primary-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pr-10 rounded-lg border border-primary-300 dark:border-primary-600 
                           bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-primary-100 focus:outline-none 
                           focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-2 flex items-center text-primary-500 dark:text-primary-400 cursor-pointer hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-primary-700 dark:text-primary-300 mb-1">Username</label>
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-primary-300 dark:border-primary-600 
                         bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-primary-100 focus:outline-none 
                         focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors"
                placeholder="Choose a username"
                required
              />
            </div>

            <div>
              <label className="block text-primary-700 dark:text-primary-300 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-primary-300 dark:border-primary-600 
                         bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-primary-100 focus:outline-none 
                         focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors"
                placeholder="Enter your phone number"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 text-primary-50 rounded-lg 
                       transition-colors font-semibold disabled:opacity-50 shadow-md border border-primary-800 dark:border-primary-500"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="mt-4 text-sm text-primary-600 dark:text-primary-400">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary-700 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-200 hover:underline font-semibold transition-colors">
                Login here
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
