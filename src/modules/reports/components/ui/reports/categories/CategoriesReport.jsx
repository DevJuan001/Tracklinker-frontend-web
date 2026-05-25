// Hooks
import { useState } from "react";
import { useCategoriesData } from "../../../../hooks/categories/useCategoriesData";
import { useCategoriesTableData } from "../../../../hooks/categories/useCategoriesTableData";
// Utils
import { getDateRange } from "../../../../../../utils/getDateRange";
// Components
import TableCard from "../../TableCard";
import ReportCard from "../../ReportCard";
import CategoriesTable from "./CategoriesTable";
import KpisContainer from "../../KpisContainer";
import ReportsContainer from "../../ReportsContainer";
import CategoriesAreaChart from "./CategoriesAreaChart";

export default function CategoriesReport({ setReport, openModal }) {
  const { categoriesData } = useCategoriesData();
  const { categoriesData: tableData } = useCategoriesTableData();
  const [period, setPeriod] = useState("1a");
  const { startDate, endDate } = getDateRange(period);

  return (
    <>
      {categoriesData.map((item) => (
        <ReportsContainer
          setReport={setReport}
          setPeriod={setPeriod}
          currentPeriod={period}
          periods={["7d", "30d", "6m", "1a"]}
          key={"categories-reports-container"}
          reportsName={"Categorias"}
          reportsDate={`${startDate} - ${endDate}`}
          openModal={openModal}
          exportData={{
            reportName: "Categorías",
            period,
            startDate,
            endDate,
            kpis: {
              Totales: item.total_categories,
              Recientes: item.recent_categories,
              Inactivas: item.inactive_categories,
              Activas: item.active_categories,
            },
            tableData,
            type: "categories",
          }}
        >
          <KpisContainer
            firstKpiName={"Totales"}
            firstKpiValue={item.total_categories}
            secondKpiName={"Recientes"}
            secondKpiValue={item.recent_categories}
            thirdKpiName={"Inactivas"}
            thirdKpiValue={item.inactive_categories}
            fourthKpiName={"Activas"}
            fourthKpiValue={item.active_categories}
          />
          <ReportCard name={"Crecimiento"} colSpan={12}>
            <CategoriesAreaChart period={period} />
          </ReportCard>

          <ReportCard name={"Distribución"} colSpan={4}></ReportCard>

          <TableCard tableTitle={"Categorías recientes"}>
            <CategoriesTable data={tableData} />
          </TableCard>
        </ReportsContainer>
      ))}
    </>
  );
}
