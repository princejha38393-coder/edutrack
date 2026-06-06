import { Clock, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <article className="course-card">
      <Link to={`/courses/${course._id}`} className="course-image">
        <img src={course.image} alt={course.title} />
        <span>{course.category}</span>
      </Link>
      <div className="course-body">
        <div className="instructor">
          <img src={course.instructor?.avatar || "https://i.pravatar.cc/120?img=8"} alt="" />
          <span>{course.instructor?.name || "EDUTRACK Faculty"}</span>
        </div>
        <h3>{course.title}</h3>
        <p>{course.subtitle}</p>
        <div className="course-meta">
          <span><Star size={16} fill="currentColor" /> {course.rating}</span>
          <span><Users size={16} /> {Number(course.students || 0).toLocaleString()}</span>
          <span><Clock size={16} /> {course.duration}</span>
        </div>
        <div className="course-footer">
          <strong>${course.price}</strong>
          <Link className="text-link" to={`/courses/${course._id}`}>View course</Link>
        </div>
      </div>
    </article>
  );
}
