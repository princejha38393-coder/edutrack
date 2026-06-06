import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { BadgeCheck, Clock, PlayCircle, Star, Users } from "lucide-react";
import http from "../api/http.js";
import Loader from "../components/Loader.jsx";
import { useAuth } from "../state/AuthContext.jsx";
import { fallbackCourses } from "../data/fallback.js";

export default function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const { data } = await http.get(`/courses/${id}`);
        setCourse(data.course);
      } catch {
        setCourse(fallbackCourses.find((item) => item._id === id) || fallbackCourses[0]);
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [id]);

  const enroll = async () => {
    if (!user) return navigate("/login");
    try {
      await http.post(`/enrollments/${course._id}`);
      toast.success("Course added to your dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Enrollment failed");
    }
  };

  if (loading) return <Loader label="Opening course" />;
  if (!course) return null;

  return (
    <>
      <Helmet><title>{course.title} | EDUTRACK</title></Helmet>
      <section className="detail-layout">
        <div className="detail-copy">
          <span className="eyebrow">{course.category} • {course.level}</span>
          <h1>{course.title}</h1>
          <p>{course.description || course.subtitle}</p>
          <div className="course-meta big">
            <span><Star size={17} fill="currentColor" /> {course.rating}</span>
            <span><Users size={17} /> {Number(course.students || 0).toLocaleString()} students</span>
            <span><Clock size={17} /> {course.duration}</span>
          </div>
          <button className="primary-btn" onClick={enroll}>Enroll for ${course.price}</button>
        </div>
        <aside className="learn-card">
          <img src={course.image} alt={course.title} />
          <h3>What you will master</h3>
          {(course.outcomes || ["Build production workflows", "Practice with real projects", "Track your progress"]).map((item) => (
            <div key={item}><BadgeCheck size={18} /> {item}</div>
          ))}
          <button className="ghost-btn wide"><PlayCircle size={18} /> Preview lessons</button>
        </aside>
      </section>
    </>
  );
}
