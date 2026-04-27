export default function ReportsContainer({
  reportsName,
  reportsDate,
  children,
}) {
  return (
    <section
      className="h-full w-full grid p-3 pt-2
        xl:grid-cols-[repeat(16,_1fr)] xl:grid-rows-7
        gap-3"
    >
      <section className="col-span-4 row-span-1 flex flex-col justify-center items-start dark:text-white">
        <span className="text-2xl font-medium">Reporte de {reportsName}</span>
        <span className="text-sm">{reportsDate}</span>
      </section>
      {children}
    </section>
  );
}
