"use client";

import { signUp } from "@/app/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";
import { FormEvent, useState } from "react";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Password Validation
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(formData.password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(formData.password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/\d/.test(formData.password)) {
      setError("Password must contain at least one number.");
      return;
    }

    setError("");

    console.log(formData);

    // Better Auth Sign Up Here
    const { data, error } = await signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    console.log(data, error);
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>

        <p className="mt-2 text-slate-500">
          Welcome! Create your account to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-slate-900"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <ul className="mt-3 space-y-1 text-xs text-slate-500">
            <li>• Minimum 8 characters</li>
            <li>• At least 1 uppercase letter</li>
            <li>• At least 1 lowercase letter</li>
            <li>• At least 1 number</li>
          </ul>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
