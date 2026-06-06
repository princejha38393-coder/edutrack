import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import http from "../api/http.js";
import CourseCard from "../components/CourseCard.jsx";
import Loader from "../components/Loader.jsx";
import { fallbackCourses } from "../data/fallback.js";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const { data } = await http.get("/courses");
        setCourses(data.courses);
      } catch {
        setCourses(fallbackCourses);
        toast.error("Showing demo catalog while API is offline");
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  const categories = ["All", ...new Set(courses.map((course) => course.category))];
  const filtered = useMemo(
    () => courses.filter((course) => {
      const matchesSearch = `${course.title} ${course.subtitle}`.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || course.category === category;
      return matchesSearch && matchesCategory;
    }),
    [courses, query, category]
  );

  return (
    <>
      <Helmet><title>Courses | EDUTRACK</title></Helmet>
      <section className="page-hero compact">
        <span className="eyebrow">Course marketplace</span>
        <h1>Learn from industry-grade programs</h1>
        <p>Filter curated programs by skill track, career level, and learning goal.</p>
      </section>
      <section className="toolbar">
        <label className="search-box">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title or skill" />
        </label>
        <div className="chips">
          {categories.map((item) => (
            <button key={item} className={item === category ? "chip active" : "chip"} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
      </section>
      {loading ? <Loader label="Fetching courses" /> : (
        <div className="course-grid">
          {filtered.map((course) => <CourseCard key={course._id} course={course} />)}
        </div>
      )}
    </>
  );
}
