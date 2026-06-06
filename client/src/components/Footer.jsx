import { BookOpen, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link to="/" className="brand footer-brand">
          <span className="brand-mark"><BookOpen size={20} /></span>
          <span>EDUTRACK</span>
        </Link>
        <p>Premium online learning for career-focused students, creators, and administrators.</p>
      </div>
      <div className="footer-grid">
        <a href="mailto:hello@edutrack.io"><Mail size={17} /> Support</a>
        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
        <a href="https://github.com" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
      </div>
    </footer>
  );
}
