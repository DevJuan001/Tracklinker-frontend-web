import { NavLink } from "react-router-dom";

export default function SeeReportButton() {
  return (
    <NavLink
      to="/reports"
      className="p-2 rounded-lg text-sm border transition duration-500 
  hover:bg-gray-300
    dark:shadow-[0px_0px_10px_2px_#0f0f11] dark:border-transparent dark:hover:bg-[#0f0f11]"
    >
      Ver Informe
    </NavLink>
  );
}
