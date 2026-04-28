import SeeReportButton from "./SeeReportButton";

export default function TopChartsCard({ title, children, background }) {
  return (
    <section
      className={`row-span-1 col-span-3 flex flex-col p-4 shadow-xl border border-gray-200 rounded-xl transition duration-500 
        hover:scale-[1.03]
        dark:bg-[#0f0f11] dark:border-transparent dark:shadow-[0px_0px_10px_2px_#0f0f11] dark:text-white ${background}`}
    >
      <section>
        <section className="flex items-center justify-between">
          {/* Nombre del Grafico */}
          <span className="font-medium text-xl">{title}</span>
          <SeeReportButton />
        </section>
      {children}
      </section>
    </section>
  );
}
