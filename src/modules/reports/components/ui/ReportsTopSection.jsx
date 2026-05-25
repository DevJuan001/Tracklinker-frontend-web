import ReturnButton from "./ReturnButton";
import ExportButton from "./ExportButton";

export default function ReportsTopSection({
  setReport,
  setPeriod,
  periods = [],
  currentPeriod,
  openModal,
  exportData,
}) {
  return (
    <section className="flex items-center justify-between pl-3 dark:text-white">
      <ReturnButton onClick={() => setReport("home")} />
      <div
        className="flex items-center justify-end gap-1.5
        md:pr-3"
      >
        {periods && periods.length > 0 && (
          <div
            className="flex gap-1 py-0.5 px-1 border rounded-2xl text-sm font-medium bg-gray-100
            dark:bg-black dark:border-none dark:shadow-[0px_0px_1px_2px_#ffffff20]"
          >
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setPeriod(period)}
                className={`px-4 py-1.5 rounded-xl 
                ${
                  currentPeriod === period
                    ? "bg-white shadow-md dark:text-black"
                    : "hover:bg-gray-300 transition duration-200 dark:hover:bg-[#2c2c2e]"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        )}
        <ExportButton openModal={openModal} exportData={exportData} />
      </div>
    </section>
  );
}
