export default function KpiCard({ name, metricValue }) {
  return (
    <section
      key={name}
      className="flex flex-col py-3 px-3 row-span-1 col-span-1 border border-gray-200 rounded-2xl transition duration-500
      xl:py-5
      hover:bg-gray-100 hover:scale-[1.02]
      dark:bg-[#0f0f11] dark:text-white dark:border-[#1e1e209f] dark:shadow-[0px_0px_10px_2px_#0f0f11] dark:hover:bg-[#2c2c2e]"
    >
      <section className="flex flex-col items-start justify-between overflow-hidden">
        <span className="text-xs md:text-sm"> {name} </span>
        <span className="pt-1 text-5xl font-medium">{metricValue}</span>
      </section>
    </section>
  );
}
