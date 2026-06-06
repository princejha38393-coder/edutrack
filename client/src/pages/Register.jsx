import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../state/AuthContext.jsx";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    try {
      await register(form);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create account");
    }
  };

  return (
    <>
      <Helmet><title>Register | EDUTRACK</title></Helmet>
      <section className="auth-layout">
        <div className="auth-art register">
          <span className="eyebrow">Start learning</span>
          <h1>Build skills with premium courses and measurable progress.</h1>
          <p>Create a student account and enroll in programs designed for real workplace outcomes.</p>
        </div>
        <form className="auth-card" onSubmit={submit}>
          <h2>Create account</h2>
          <label>Name<input required minLength="2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label>Password<input type="password" required minLength="8" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
          <button className="primary-btn wide" disabled={loading}>{loading ? "Creating..." : "Create account"}</button>
          <p>Already registered? <Link to="/login">Login</Link></p>
        </form>
      </section>
    </>
  );
}
