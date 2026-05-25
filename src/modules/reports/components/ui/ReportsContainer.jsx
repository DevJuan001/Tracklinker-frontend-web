import ReportsTopSection from "./ReportsTopSection";

export default function ReportsContainer({
  reportsName,
  reportsDate,
  children,
  setReport,
  setPeriod,
  periods,
  currentPeriod,
  openModal,
  exportData
}) {
  return (
    <section className="w-full h-full flex flex-col gap-2 animate-blurUp">
      <ReportsTopSection
        setPeriod={setPeriod}
        setReport={setReport}
        periods={periods}
        currentPeriod={currentPeriod}
        openModal={openModal}
        exportData={exportData}
      />

      <section
        className="h-full w-full grid grid-cols-1 p-3 pt-2 gap-3 overflow-x-auto overflow-y-auto overflow-hidden
        xl:grid-cols-[repeat(16,_1fr)] xl:grid-rows-7"
      >
        <section className="col-span-4 row-span-1 flex flex-col justify-center items-start dark:text-white">
          <span className="text-2xl font-medium">Reporte de {reportsName}</span>
          <span className="text-sm">{reportsDate}</span>
        </section>
        {children}
      </section>
    </section>
  );
}
