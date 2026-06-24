import SeeReportButton from "./SeeReportButton";

export default function ChartCard({
  name,
  percentValue,
  metricValue,
  chart,
  rowSpan,
  colSpan,
  bgColor,
  textColor,
  imageDisplay,
  imageSize,
  children,
}) {
  return (
    <section
      className={`h-full row-span-1 col-span-1 bg-${bgColor} text-${textColor} dark:text-white
        flex flex-col p-4 shadow-md border border-gray-200 rounded-3xl transition duration-500
        md:col-span-${colSpan} md:row-span-${rowSpan}  
        hover:bg-gray-200 hover:scale-[1.005]
        dark:bg-[#101012b9] dark:border-[#ffffff10] dark:hover:bg-[#2c2c2e]
      `}
    >
      <div className="flex items-start justify-between">
        <span className="font-medium text-base"> {name} </span>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">{metricValue}</span>

          <span>{percentValue}</span>
        </div>

        <SeeReportButton />
      </div>

      <img src={chart} alt="" className={`${imageSize} ${imageDisplay}`} />

      {children}
    </section>
  );
}
