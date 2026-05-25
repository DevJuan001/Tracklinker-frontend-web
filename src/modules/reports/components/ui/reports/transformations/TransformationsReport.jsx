// Hooks
import { useState } from "react";
// Utils
import { getDateRange } from "../../../../../../utils/getDateRange";
// Componentes
import ReportsContainer from "../../ReportsContainer";
import ReportsTopSection from "../../ReportsTopSection";

export default function TransformationsReport({ setReport }) {
  const [period, setPeriod] = useState("1a");
  const { startDate, endDate } = getDateRange(period);

  return (
    <section className="w-full h-full flex flex-col gap-2 animate-blurUp">
      <ReportsTopSection
        setReport={setReport}
        periods={["7d", "30d", "6m", "1a"]}
        setPeriod={setPeriod}
        currentPeriod={period}
      />

      <ReportsContainer
        key={"transformations-reports-container"}
        reportsName={"transformaciones"}
        reportsDate={`${startDate} - ${endDate}`}
      />
    </section>
  );
}
