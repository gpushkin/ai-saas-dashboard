export default function UsageChart({
  data,
}: {
  data: Record<string, number>;
}) {
  const days = Object.keys(data).slice(-7);
  const values = days.map((d) => data[d]);

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h3 style={{ marginBottom: "12px" }}>Last 7 Days Usage</h3>

      {days.map((day, i) => (
        <div key={day} style={{ marginBottom: "8px" }}>
          <small>{day}</small>
          <div
            style={{
              height: "8px",
              width: `${values[i] * 10}px`,
              background: "#4f46e5",
              borderRadius: "4px",
            }}
          />
        </div>
      ))}
    </div>
  );
}