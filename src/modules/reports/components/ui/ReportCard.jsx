export default function ReportCard({ name, colSpan, children }) {
  return (
    <section
      key={name}
      className={`row-span-3 col-span-12 bg-white flex flex-col p-5 border border-gray-200 rounded-2xl transition duration-500
      xl:col-span-${colSpan}
      hover:bg-gray-100 hover:scale-[1.01]
      dark:bg-[#0f0f11] dark:text-white dark:border-[#1e1e209f] dark:shadow-[0px_0px_10px_2px_#0f0f11] dark:hover:bg-[#2c2c2e]`}
    >
      <section className="flex flex-col items-start justify-between gap-6">
        <span> {name} </span>
        <section className="h-auto w-full">{children}</section>
      </section>
    </section>
  );
}
