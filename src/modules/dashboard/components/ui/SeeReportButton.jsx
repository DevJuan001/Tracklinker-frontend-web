import { NavLink } from "react-router-dom";

export default function SeeReportButton() {
  return (
    <NavLink
      to="/reports"
      className="self-start p-2 rounded-lg text-sm border bg-[#ffffff3d] shadow-[0px_0px_2px_0.5px_#ffffff99] transition duration-200
      hover:bg-[#E2E4E5]
      dark:bg-[#0000003d] dark:shadow-[0px_0px_10px_2px_#0f0f11] dark:border-[#ffffff15] dark:hover:bg-[#0f0f11]"
    >
      Ver Informe
    </NavLink>
  );
}
