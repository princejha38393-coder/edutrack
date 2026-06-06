export default function StatCard({ label, value, tone = "cyan", icon: Icon }) {
  return (
    <div className={`stat-card ${tone}`}>
      {Icon && <Icon size={22} />}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
