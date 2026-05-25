// Hooks
import { useState } from "react";
// Utils
import { getDateRange } from "../../../../../../utils/getDateRange";
// Componentes
import ReportsContainer from "../../ReportsContainer";

export default function TransformationsReport({ setReport, openModal }) {
  const [period, setPeriod] = useState("1a");
  const { startDate, endDate } = getDateRange(period);

  return (
    <ReportsContainer
      key={"transformations-reports-container"}
      reportsName={"transformaciones"}
      reportsDate={`${startDate} - ${endDate}`}
      setReport={setReport}
      setPeriod={setPeriod}
      periods={["7d", "30d", "6m", "1a"]}
      currentPeriod={period}
      openModal={openModal}
      exportData={{
        reportName: "Transformaciones",
        period,
        startDate,
        endDate,
        kpis: {},
        tableData: [],
        type: "transformations",
      }}
    />
  );
}
