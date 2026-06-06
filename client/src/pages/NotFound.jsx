import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page-hero compact center">
      <span className="eyebrow">404</span>
      <h1>Page not found</h1>
      <p>The page you opened is not part of this learning path.</p>
      <Link className="primary-btn" to="/">Back home</Link>
    </section>
  );
}
