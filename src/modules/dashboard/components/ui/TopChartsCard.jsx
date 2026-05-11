import SeeReportButton from "./SeeReportButton";

export default function TopChartsCard({
  title,
  background,
  metricValue,
  growth,
}) {
  return (
    <section
      className={`h-full row-span-1 col-span-1 flex flex-col p-4 shadow-xl border border-gray-200 rounded-xl transition duration-500 
        hover:scale-[1.005]
        md:col-span-3
        dark:bg-[#0f0f11] dark:border-[#ffffff10] dark:text-white ${background}`}
    >
      <section>
        <section className="flex items-center justify-between">
          {/* Nombre del Grafico */}
          <div className="flex flex-col gap-6">
            <span className="font-medium">{title}</span>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-5xl">{metricValue}</span>
              <span
                className={`text-lg ${growth > 0 ? "text-green-500" : "text-[#75777E]"}`}
              >
                {`+${growth}`}
              </span>
            </div>
          </div>
          <SeeReportButton />
        </section>
      </section>
    </section>
  );
}
