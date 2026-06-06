import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../state/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const user = await login(form);
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to sign in");
    }
  };

  return (
    <>
      <Helmet><title>Login | EDUTRACK</title></Helmet>
      <section className="auth-layout">
        <div className="auth-art">
          <span className="eyebrow">Welcome back</span>
          <h1>Continue learning with a dashboard that keeps up.</h1>
          <p>Track enrolled courses, admin operations, progress, and performance in one polished workspace.</p>
        </div>
        <form className="auth-card" onSubmit={submit}>
          <h2>Login</h2>
          <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label>Password<input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
          <button className="primary-btn wide" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
          <p>New to EDUTRACK? <Link to="/register">Create account</Link></p>
        </form>
      </section>
    </>
  );
}
