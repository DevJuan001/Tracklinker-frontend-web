// Hooks
import { useState } from "react";
import { useWarrantiesData } from "../../../../hooks/warranties/useWarrantiesData";
import { useWarrantiesTableData } from "../../../../hooks/warranties/useWarrantiesTableData";
// Utils
import { getDateRange } from "../../../../../../utils/getDateRange";
// Components
import KpisContainer from "../../KpisContainer";
import ReportsContainer from "../../ReportsContainer";
import TableCard from "../../TableCard";
import ReportCard from "../../ReportCard";
import WarrantiesTable from "./WarrantiesTable";
import WarrantiesPieChart from "./WarrantiesPieChart";
import WarrantiesAreaChart from "./WarrantiesAreaChart";

export default function WarrantiesReport({ setReport, openModal }) {
  const { warrantiesData } = useWarrantiesData();
  const { warranties: tableData } = useWarrantiesTableData();
  const [period, setPeriod] = useState("1a");
  const { startDate, endDate } = getDateRange(period);

  return (
    <>
      {warrantiesData.map((item) => (
        <ReportsContainer
          key={"warranties-reports-container"}
          reportsName={"Garantías"}
          reportsDate={`${startDate} - ${endDate}`}
          setReport={setReport}
          setPeriod={setPeriod}
          periods={["7d", "30d", "6m", "1a"]}
          currentPeriod={period}
          openModal={openModal}
          exportData={{
            reportName: "Garantías",
            period,
            startDate,
            endDate,
            kpis: {
              Total: item.total_warranties,
              "Sin Completar": item.without_make_warranties,
              "En Proceso": item.inprocess_warranties,
              Completadas: item.complete_warranties,
            },
            tableData,
            type: "warranties",
          }}
        >
          {/* Cards o KPIs principales */}
          <KpisContainer
            firstKpiName={"Total"}
            firstKpiValue={item.total_warranties}
            secondKpiName={"Sin Completar"}
            secondKpiValue={item.without_make_warranties}
            thirdKpiName={"En Proceso"}
            thirdKpiValue={item.inprocess_warranties}
            fourthKpiName={"Completadas"}
            fourthKpiValue={item.complete_warranties}
          />

          <ReportCard name={"Crecimiento"} colSpan={12}>
            <WarrantiesAreaChart period={period} />
          </ReportCard>

          <ReportCard name={"Distribución"} colSpan={4}>
            <WarrantiesPieChart period={period} />
          </ReportCard>

          <TableCard tableTitle={"Garantías recientes"}>
            <WarrantiesTable data={tableData} />
          </TableCard>
        </ReportsContainer>
      ))}
    </>
  );
}
