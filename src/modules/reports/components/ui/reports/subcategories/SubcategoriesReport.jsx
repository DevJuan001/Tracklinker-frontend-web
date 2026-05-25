// Hooks
import { useState } from "react";
import { useSubcategoriesData } from "../../../../hooks/subcategories/useSubcategoriesData";
import { useSubcategoriesTableData } from "../../../../hooks/subcategories/useSubCategoriesTableData";
// Utils
import { getDateRange } from "../../../../../../utils/getDateRange";
// Components
import KpisContainer from "../../KpisContainer";
import ReportsContainer from "../../ReportsContainer";
import TableCard from "../../TableCard";
import ReportCard from "../../ReportCard";
import SubcategoriesAreaChart from "./SubcategoriesAreaChart";
import SubcategoriesTable from "./SubcategoriesTable";
import SubcategoriesPieChart from "./SubcategoriesPieChart";

export default function SubcategoriesReport({ setReport, openModal }) {
  const { subcategoriesData } = useSubcategoriesData();
  const { subcategoriesData: tableData } = useSubcategoriesTableData();
  const [period, setPeriod] = useState("1a");
  const { startDate, endDate } = getDateRange(period);

  return (
    <>
      {subcategoriesData.map((item) => (
        <ReportsContainer
          key={"subcategories-reports-container"}
          reportsName={"Subcategorias"}
          reportsDate={`${startDate} - ${endDate}`}
          setReport={setReport}
          setPeriod={setPeriod}
          periods={["7d", "30d", "6m", "1a"]}
          currentPeriod={period}
          openModal={openModal}
          exportData={{
            reportName: "Subcategorías",
            period,
            startDate,
            endDate,
            kpis: {
              "Totales": item.total_subcategories,
              "Recientes": item.recent_subcategories,
              "Inactivas": item.inactive_subcategories,
              "Activas": item.active_subcategories,
            },
            tableData,
            type: "subcategories",
          }}
        >
          {/* Cards o KPIs principales */}
          <KpisContainer
            firstKpiName={"Totales"}
            firstKpiValue={item.total_subcategories}
            secondKpiName={"Recientes"}
            secondKpiValue={item.recent_subcategories}
            thirdKpiName={"Inactivas"}
            thirdKpiValue={item.inactive_subcategories}
            fourthKpiName={"Activas"}
            fourthKpiValue={item.active_subcategories}
          />

          <ReportCard name={"Crecimiento"} colSpan={12}>
            <SubcategoriesAreaChart period={period} />
          </ReportCard>

          <ReportCard name={"Distribución"} colSpan={4}>
            <SubcategoriesPieChart period={period} />
          </ReportCard>

          <TableCard tableTitle={"Subcategorias recientes"}>
            <SubcategoriesTable data={tableData} />
          </TableCard>
        </ReportsContainer>
      ))}
    </>
  );
}
