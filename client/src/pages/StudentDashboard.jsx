import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BookOpen, Clock, Trophy } from "lucide-react";
import http from "../api/http.js";
import Loader from "../components/Loader.jsx";
import StatCard from "../components/StatCard.jsx";
import { useAuth } from "../state/AuthContext.jsx";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    http.get("/enrollments/me")
      .then(({ data }) => setDashboard(data))
      .catch(() => setDashboard({ enrollments: [] }));
  }, []);

  if (!dashboard) return <Loader label="Preparing dashboard" />;

  return (
    <>
      <Helmet><title>Student Dashboard | EDUTRACK</title></Helmet>
      <section className="dashboard-head">
        <div>
          <span className="eyebrow">Student workspace</span>
          <h1>Welcome, {user.name}</h1>
          <p>Resume learning, review progress, and keep your next milestone visible.</p>
        </div>
      </section>
      <section className="stats-grid">
        <StatCard icon={BookOpen} label="Enrolled" value={dashboard.enrollments.length} />
        <StatCard icon={Clock} label="Hours planned" value="42" tone="green" />
        <StatCard icon={Trophy} label="Certificates" value="3" tone="violet" />
      </section>
      <section className="dashboard-grid">
        <div className="panel span-2">
          <h2>My courses</h2>
          {dashboard.enrollments.length === 0 ? <p className="muted">Enroll in a course to see it here.</p> : dashboard.enrollments.map(({ _id, course, progress }) => (
            <div className="progress-row" key={_id}>
              <img src={course.image} alt="" />
              <div>
                <strong>{course.title}</strong>
                <span>{course.category} • {course.level}</span>
                <div className="progress"><span style={{ width: `${progress}%` }} /></div>
              </div>
              <b>{progress}%</b>
            </div>
          ))}
        </div>
        <div className="panel">
          <h2>Weekly focus</h2>
          <div className="timeline">
            {["Complete lesson modules", "Submit capstone", "Book mentor review"].map((item) => <div key={item}>{item}</div>)}
          </div>
        </div>
      </section>
    </>
  );
}
