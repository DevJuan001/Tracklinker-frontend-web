// Hooks
import { useState } from "react";
import { useSuppliersData } from "../../../../hooks/suppliers/useSuppliersData";
import { useSuppliersTableData } from "../../../../hooks/suppliers/useSuppliersTableData";
// Utils
import { getDateRange } from "../../../../../../utils/getDateRange";
// Components
import KpisContainer from "../../KpisContainer";
import ReportsContainer from "../../ReportsContainer";
import TableCard from "../../TableCard";
import ReportCard from "../../ReportCard";
import SuppliersAreaChart from "./SuppliersAreaChart";
import SuppliersPieChart from "./SuppliersPieChart";
import SuppliersTable from "./SuppliersTable";

export default function SuppliersReport({ setReport, openModal }) {
  const { suppliersData } = useSuppliersData();
  const { suppliers: tableData } = useSuppliersTableData();
  const [period, setPeriod] = useState("1a");
  const { startDate, endDate } = getDateRange(period);

  return (
    <>
      {suppliersData.map((item) => (
        <ReportsContainer
          key={"suppliers-reports-container"}
          reportsName={"Proveedores"}
          reportsDate={`${startDate} - ${endDate}`}
          setReport={setReport}
          setPeriod={setPeriod}
          periods={["7d", "30d", "6m", "1a"]}
          currentPeriod={period}
          openModal={openModal}
          exportData={{
            reportName: "Proveedores",
            period,
            startDate,
            endDate,
            kpis: {
              Total: item.total_suppliers,
              Recientes: item.recent_suppliers,
              Inactivos: item.inactive_suppliers,
              Activos: item.active_suppliers,
            },
            tableData,
            type: "suppliers",
          }}
        >
          {/* Cards o KPIs principales */}
          <KpisContainer
            firstKpiName={"Total"}
            firstKpiValue={item.total_suppliers}
            secondKpiName={"Recientes"}
            secondKpiValue={item.recent_suppliers}
            thirdKpiName={"Inactivos"}
            thirdKpiValue={item.inactive_suppliers}
            fourthKpiName={"Activos"}
            fourthKpiValue={item.active_suppliers}
          />

          <ReportCard name={"Crecimiento"} colSpan={12}>
            <SuppliersAreaChart period={period} />
          </ReportCard>

          <ReportCard name={"Distribución"} colSpan={4}>
            <SuppliersPieChart period={period} />
          </ReportCard>

          <TableCard tableTitle={"Proveedores recientes"}>
            <SuppliersTable data={tableData} />
          </TableCard>
        </ReportsContainer>
      ))}
    </>
  );
}
