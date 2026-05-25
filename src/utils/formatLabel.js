export function formatLabel(label, period) {
  const dailyPeriods = ["7d", "15d"];

  if (dailyPeriods.includes(period)) {
    // si el label es "2025-04-03", muestra "Abr 3"
    const date = new Date(label + "T00:00:00");
    return date.toLocaleDateString("es-ES", { month: "short", day: "numeric" });
  } else {
    // si el label es "2025-04", muestra "Abr 2025"
    const [year, month] = label.split("-");
    const date = new Date(year, month - 1);
    
    return date.toLocaleDateString("es-ES", {
      month: "short",
      year: "numeric",
    });
  }
}
