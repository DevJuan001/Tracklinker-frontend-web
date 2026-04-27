export function formatLabel(label, period) {
  const dailyPeriods = ["7d", "15d"];

  if (dailyPeriods.includes(period)) {
    // label es "2025-04-03", muestra "Apr 3"
    const date = new Date(label + "T00:00:00");
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } else {
    // label es "2025-04", muestra "Apr 2025"
    const [year, month] = label.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }
}
