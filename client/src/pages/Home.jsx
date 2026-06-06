import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, BarChart3, GraduationCap, PlayCircle, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard.jsx";
import StatCard from "../components/StatCard.jsx";
import { fallbackCourses } from "../data/fallback.js";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>EDUTRACK | Premium Learning for Modern Careers</title>
      </Helmet>
      <section className="hero">
        <div className="hero-copy">
          <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
            <Sparkles size={16} /> Premium MERN learning experience
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            EDUTRACK
          </motion.h1>
          <p>Learn career-ready skills through curated courses, live progress tracking, polished dashboards, and admin tools built for scale.</p>
          <div className="hero-actions">
            <Link className="primary-btn" to="/courses">Explore courses <ArrowRight size={18} /></Link>
            <Link className="ghost-btn" to="/register"><PlayCircle size={18} /> Start free</Link>
          </div>
          <div className="trust-row">
            <span><BadgeCheck size={17} /> Verified mentors</span>
            <span><ShieldCheck size={17} /> Secure learning</span>
            <span><Users size={17} /> 42k+ learners</span>
          </div>
        </div>
        <motion.div className="hero-panel" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.16 }}>
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80" alt="Students learning together" />
          <div className="floating-card top">
            <GraduationCap size={24} />
            <strong>96%</strong>
            <span>completion lift</span>
          </div>
          <div className="floating-card bottom">
            <BarChart3 size={24} />
            <strong>Live analytics</strong>
            <span>course, revenue, learner insights</span>
          </div>
        </motion.div>
      </section>
      <section className="stats-grid">
        <StatCard icon={Users} label="Active learners" value="42,800" />
        <StatCard icon={GraduationCap} label="Courses shipped" value="320+" tone="green" />
        <StatCard icon={BarChart3} label="Avg. rating" value="4.8/5" tone="violet" />
      </section>
      <section className="section-head">
        <div>
          <span className="eyebrow">Featured catalog</span>
          <h2>Courses that feel premium from first click to certificate.</h2>
        </div>
        <Link className="text-link" to="/courses">Browse all</Link>
      </section>
      <div className="course-grid featured">
        {fallbackCourses.map((course) => <CourseCard key={course._id} course={course} />)}
      </div>
      <section className="feature-band">
        {["Role-aware dashboards", "JWT protected APIs", "Dark mode interface", "Responsive course marketplace"].map((item) => (
          <div key={item}><BadgeCheck size={19} /> {item}</div>
        ))}
      </section>
    </>
  );
}
