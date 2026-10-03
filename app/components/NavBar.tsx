"use client";

import Link from "next/link";
import { signOut, useSession } from "../lib/auth-client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/workouts", label: "Workouts" },
  { href: "/plans", label: "Plans" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-900"
        >
          FITLOG
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />

              <div className="hidden sm:block">
                <div className="mb-1 h-3 w-24 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          ) : session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Dashboard
              </Link>

              <button
                onClick={handleSignOut}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Sign Out
              </button>
              <Link
                href="/profile"
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Profile
              </Link>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-3 py-2">
                <img
                  src={
                    session.user.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      session.user.name || "User",
                    )}`
                  }
                  alt={session.user.name || "User"}
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div className="hidden sm:block">
                  <p className="max-w-[140px] truncate text-sm font-semibold text-slate-900">
                    {session.user.name}
                  </p>

                  <p className="max-w-[180px] truncate text-xs text-slate-500">
                    {session.user.email}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
