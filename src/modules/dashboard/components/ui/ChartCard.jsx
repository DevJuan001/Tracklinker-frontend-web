import { NavLink } from "react-router-dom";
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
      className={`row-span-1 col-span-1 bg-${bgColor} text-${textColor} dark:text-white
        flex flex-col p-3 shadow-xl border border-gray-200 rounded-xl transition duration-500
        hover:bg-gray-200 hover:scale-[1.02]
        dark:bg-[#0f0f11] dark:border-[#ffffff10] dark:hover:bg-[#2c2c2e]
        md:col-span-${colSpan} md:row-span-${rowSpan}  
        `}
    >
      <section className="flex items-start justify-between">
        <section>
          <p className="font-medium text-base"> {name} </p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold">{metricValue}</p>
            <p>{percentValue}</p>
          </div>
        </section>
        <SeeReportButton />
      </section>
      <img src={chart} alt="" className={`${imageSize} ${imageDisplay}`} />
      {children}
    </section>
  );
}
