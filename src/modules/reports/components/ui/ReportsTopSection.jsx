import ReturnButton from "./ReturnButton";
import ExportButton from "./ExportButton";

export default function ReportsTopSection({
  setReport,
  setPeriod,
  periods,
  currentPeriod,
}) {
  return (
    <section className="flex items-center justify-between pl-3 dark:text-white">
      <ReturnButton onClick={() => setReport("home")} />
      <div className="flex items-center justify-end gap-1.5 pr-3">
        <div
          className="flex gap-1 py-0.5 px-1 border rounded-xl text-sm font-medium bg-gray-200
          dark:bg-gray-950 dark:border-neutral-800"
        >
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setPeriod(period)}
              className={`px-4 py-1.5 rounded-lg 
              ${
                currentPeriod === period
                  ? "bg-white shadow-md dark:text-black"
                  : "hover:bg-gray-300 transition duration-300 dark:hover:bg-[#2c2c2e]"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
        <ExportButton />
      </div>
    </section>
  );
}
