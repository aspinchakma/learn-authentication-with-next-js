"use client";

import { signIn } from "@/app/lib/auth-client";
import { FormEvent, useState } from "react";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Email:", formData.email);
    console.log("Password:", formData.password);
    const { data, error } = await signIn.email({
      email: formData.email,
      password: formData.password,
      callbackURL: "/",
    });
    console.log(data, error);

    // Better Auth
    // await authClient.signIn.email({
    //   email: formData.email,
    //   password: formData.password,
    // });
  };
  const handleGoogleSignIn = async () => {
    const resData = await signIn.social({
      provider: "google",
    });
    console.log(resData);
  };
  const handleGithub = async () => {
    const resdata = await signIn.social({
      provider: "github",
    });
    console.log(resdata);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>

            <p className="mt-2 text-slate-500">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>

                <a
                  href="/forgot-password"
                  className="text-sm text-slate-500 hover:text-slate-900"
                >
                  Forgot Password?
                </a>
              </div>

              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 py-3 font-medium text-white transition hover:bg-slate-800"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <a href="/sign-up" className="font-semibold text-slate-900">
              Sign Up
            </a>
          </p>
          <div className="flex justify-center mt-5">
            <button
              className="mx-auto text-[14px] mt-4 px-3 py-2 rounded-xl bg-black text-white font-bold"
              onClick={handleGoogleSignIn}
            >
              Sign In With Google Account
            </button>
          </div>
          <div className="flex justify-center mt-5">
            <button
              className="mx-auto text-[14px] mt-4 px-3 py-2 rounded-xl bg-black text-white font-bold"
              onClick={handleGithub}
            >
              Sign In With Github Account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
