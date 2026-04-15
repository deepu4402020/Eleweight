"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, AlertCircle, Loader2, Zap, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router   = useRouter();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

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
          <div className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-4 py-2 mb-8">
            <ShieldCheck className="w-3.5 h-3.5 text-white/60" />
            <span className="text-[10px] font-bold text-white/60 tracking-[0.2em] uppercase">
              Secure Onboarding
            </span>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white mb-6 leading-[1.05] tracking-tight">
            Architect Your<br />
            <span className="text-white/50">Ideal Form.</span>
          </h1>
          <p className="text-base text-white/50 leading-relaxed max-w-sm">
            Initialize your profile within the Eleweight intelligence ecosystem. Precision tracking starts with a single identity.
          </p>
        </motion.div>

        {/* Benefits list */}
        <div className="relative z-10 space-y-3">
          {['Full movement library access', 'Personalized nutrition maps', 'Real-time form analysis'].map((b) => (
            <div key={b} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
              <span className="text-xs text-white/40 font-sans">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-10">
            <div className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ background: "var(--foreground)" }}>
              <Zap className="w-4 h-4" style={{ color: "var(--background)" }} />
            </div>
            <span className="text-lg font-display font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
              Eleweight
            </span>
          </div>

          <div className="mb-10">
            <h2 className="font-display text-3xl mb-2 tracking-tight" style={{ color: "var(--foreground)" }}>
              Create account
            </h2>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Join the sanctuary of high-performance athletes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { id: "reg-name",     label: "Full Name",  type: "text",     value: name,     setter: setName,     placeholder: "Marcus Aurelius" },
              { id: "reg-email",    label: "Email",      type: "email",    value: email,    setter: setEmail,    placeholder: "athlete@eleweight.com" },
              { id: "reg-password", label: "Password",   type: "password", value: password, setter: setPassword, placeholder: "Minimum 8 characters" },
            ].map(({ id, label, type, value, setter, placeholder }) => (
              <div key={id}>
                <label
                  className="block text-[10px] font-bold uppercase tracking-[0.22em] mb-2"
                  style={{ color: "var(--muted)" }}
                >
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  required
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  placeholder={placeholder}
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
            ))}

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
              id="register-submit"
              disabled={loading}
              className="w-full font-sans font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group text-sm mt-2"
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
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm" style={{ color: "var(--muted)" }}>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold underline underline-offset-4"
              style={{ color: "var(--foreground)" }}
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
