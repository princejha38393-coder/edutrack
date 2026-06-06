export default function Loader({ label = "Loading EDUTRACK" }) {
  return (
    <div className="loader-wrap" role="status">
      <div className="loader" />
      <span>{label}</span>
    </div>
  );
}
