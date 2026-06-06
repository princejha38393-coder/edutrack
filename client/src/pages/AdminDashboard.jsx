import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { BookOpen, DollarSign, Users } from "lucide-react";
import http from "../api/http.js";
import Loader from "../components/Loader.jsx";
import StatCard from "../components/StatCard.jsx";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [form, setForm] = useState({ title: "", category: "", price: 49, level: "Beginner" });

  const load = () => {
    http.get("/admin/overview")
      .then(({ data }) => setData(data))
      .catch(() => setData({ metrics: { users: 0, courses: 0, revenue: 0 }, courses: [] }));
  };

  useEffect(load, []);

  const createCourse = async (event) => {
    event.preventDefault();
    try {
      await http.post("/courses", {
        ...form,
        subtitle: "New premium EDUTRACK program",
        description: "A structured course created from the admin dashboard.",
        duration: "12h",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
        outcomes: ["Plan learning objectives", "Practice applied projects", "Measure outcomes"]
      });
      toast.success("Course created");
      setForm({ title: "", category: "", price: 49, level: "Beginner" });
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Course creation failed");
    }
  };

  if (!data) return <Loader label="Loading admin" />;

  return (
    <>
      <Helmet><title>Admin Dashboard | EDUTRACK</title></Helmet>
      <section className="dashboard-head">
        <div>
          <span className="eyebrow">Admin command center</span>
          <h1>Course, learner, and revenue operations</h1>
          <p>Manage catalog growth with role-protected APIs and live platform metrics.</p>
        </div>
      </section>
      <section className="stats-grid">
        <StatCard icon={Users} label="Users" value={data.metrics.users} />
        <StatCard icon={BookOpen} label="Courses" value={data.metrics.courses} tone="green" />
        <StatCard icon={DollarSign} label="Revenue" value={`$${data.metrics.revenue}`} tone="violet" />
      </section>
      <section className="dashboard-grid">
        <form className="panel admin-form" onSubmit={createCourse}>
          <h2>Create course</h2>
          <input placeholder="Course title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input placeholder="Category" required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
            <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
          </select>
          <input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          <button className="primary-btn wide">Publish course</button>
        </form>
        <div className="panel span-2">
          <h2>Catalog inventory</h2>
          {data.courses.map((course) => (
            <div className="table-row" key={course._id}>
              <strong>{course.title}</strong>
              <span>{course.category}</span>
              <span>${course.price}</span>
              <span>{course.isPublished ? "Published" : "Draft"}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
