"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, AlertCircle, Loader2, Zap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Authentication failed");

      localStorage.setItem("token",     data.token);
      localStorage.setItem("userName",  data.user.name);
      localStorage.setItem("userEmail", data.user.email);
      document.cookie = `token=${data.token}; path=/; max-age=3600; SameSite=Lax`;

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans" style={{ background: "var(--background)" }}>

      {/* ── Left panel (dark) ── */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-14 relative overflow-hidden"
        style={{ background: "#0A0A0A" }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
            <Zap className="w-4 h-4 text-black" />
          </div>
          <span className="text-xl font-display font-semibold text-white tracking-tight">Eleweight</span>
        </div>

        {/* Hero copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white mb-6 leading-[1.05] tracking-tight">
            Reclaim Your<br />
            <span className="text-white/50">Kinetic Edge.</span>
          </h1>
          <p className="text-base text-white/50 leading-relaxed max-w-sm">
            Step back into the Sanctuary. Your personalised bio-metrics and aesthetic evolution await.
          </p>
        </motion.div>

        {/* Bottom quote */}
        <p className="relative z-10 text-[10px] font-sans text-white/25 uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Eleweight · Designed for the human form
        </p>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-10">
            <div className="w-7 h-7 rounded-md bg-[var(--foreground)] flex items-center justify-center">
              <Zap className="w-4 h-4" style={{ color: "var(--background)" }} />
            </div>
            <span className="text-lg font-display font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
              Eleweight
            </span>
          </div>

          <div className="mb-10">
            <h2 className="font-display text-3xl mb-2 tracking-tight" style={{ color: "var(--foreground)" }}>
              Welcome back
            </h2>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Sign in to access your training sanctuary.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-[10px] font-bold uppercase tracking-[0.22em] mb-2"
                style={{ color: "var(--muted)" }}
              >
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@eleweight.com"
                className="w-full rounded-xl px-4 py-3 text-sm font-sans outline-none transition-all"
                style={{
                  background:   "var(--surface)",
                  border:       "1px solid var(--border)",
                  color:        "var(--foreground)",
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = "var(--border-dark)"}
                onBlur={(e)  => e.currentTarget.style.borderColor = "var(--border)"}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="text-[10px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: "var(--muted)" }}
                >
                  Password
                </label>
                <a href="#" className="text-[10px] font-semibold" style={{ color: "var(--muted)" }}>
                  Forgot?
                </a>
              </div>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl px-4 py-3 text-sm font-sans outline-none transition-all"
                style={{
                  background: "var(--surface)",
                  border:     "1px solid var(--border)",
                  color:      "var(--foreground)",
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = "var(--border-dark)"}
                onBlur={(e)  => e.currentTarget.style.borderColor = "var(--border)"}
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 flex items-center gap-3 text-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              id="login-submit"
              disabled={loading}
              className="w-full font-sans font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group text-sm"
              style={{
                background: "var(--foreground)",
                color:      "var(--background)",
                opacity:    loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm" style={{ color: "var(--muted)" }}>
            New to Eleweight?{" "}
            <Link
              href="/register"
              className="font-semibold underline underline-offset-4"
              style={{ color: "var(--foreground)" }}
            >
              Create account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
