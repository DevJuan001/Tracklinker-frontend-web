// Hooks
import { useState } from "react";
import { useOutputsData } from "../../../../hooks/outputs/useOutputsData";
import { useOutputsTableData } from "../../../../hooks/outputs/useOutputsTableData";
// Utils
import { getDateRange } from "../../../../../../utils/getDateRange";
// Components
import KpisContainer from "../../KpisContainer";
import ReportsContainer from "../../ReportsContainer";
import TableCard from "../../TableCard";
import ReportCard from "../../ReportCard";
import OutputsAreaChart from "./OutputsAreaChart";
import OutputsPieChart from "./OutputsPieChart";
import OutputsTable from "./OutputsTable";

export default function OutputsReport({ setReport, openModal }) {
  const { outputsData } = useOutputsData();
  const { outputs: tableData } = useOutputsTableData();
  const [period, setPeriod] = useState("1a");
  const { startDate, endDate } = getDateRange(period);

  return (
    <>
      {outputsData.map((item) => (
        <ReportsContainer
          key={"outputs-reports-container"}
          reportsName={"Salidas"}
          reportsDate={`${startDate} - ${endDate}`}
          setReport={setReport}
          setPeriod={setPeriod}
          periods={["7d", "30d", "6m", "1a"]}
          currentPeriod={period}
          openModal={openModal}
          exportData={{
            reportName: "Salidas",
            period,
            startDate,
            endDate,
            kpis: {
              Total: item.total_outputs,
              Recientes: item.recent_outputs,
              Inactivas: item.inactive_outputs,
              Activas: item.active_outputs,
            },
            tableData,
            type: "outputs",
          }}
        >
          {/* Cards o KPIs principales */}
          <KpisContainer
            firstKpiName={"Total"}
            firstKpiValue={item.total_outputs}
            secondKpiName={"Recientes"}
            secondKpiValue={item.recent_outputs}
            thirdKpiName={"Inactivas"}
            thirdKpiValue={item.inactive_outputs}
            fourthKpiName={"Activas"}
            fourthKpiValue={item.active_outputs}
          />

          <ReportCard name={"Crecimiento"} colSpan={12}>
            <OutputsAreaChart period={period} />
          </ReportCard>

          <ReportCard name={"Distribución"} colSpan={4}>
            <OutputsPieChart period={period} />
          </ReportCard>

          <TableCard tableTitle={"Salidas recientes"}>
            <OutputsTable data={tableData} />
          </TableCard>
        </ReportsContainer>
      ))}
    </>
  );
}
