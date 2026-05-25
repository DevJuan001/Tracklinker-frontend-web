// Hooks
import { useState } from "react";
import { useUsersData } from "../../../../hooks/users/useUsersData";
import { useUsersTableData } from "../../../../hooks/users/useUsersTableData";
// Utils
import { getDateRange } from "../../../../../../utils/getDateRange";
// Components
import UsersTable from "./UsersTable";
import TableCard from "../../TableCard";
import ReportCard from "../../ReportCard";
import UsersPieChart from "./UsersPieChart";
import UsersAreaChart from "./UsersAreaChart";
import KpisContainer from "../../KpisContainer";
import ReportsContainer from "../../ReportsContainer";

export default function UsersReport({ setReport, openModal }) {
  const { usersData } = useUsersData();
  const { users: tableData } = useUsersTableData();
  const [period, setPeriod] = useState("1a");
  const { startDate, endDate } = getDateRange(period);

  return (
    <>
      {usersData.map((item) => (
        <ReportsContainer
          key={"users-reports-container"}
          reportsName={"Usuarios"}
          reportsDate={`${startDate} - ${endDate}`}
          setReport={setReport}
          setPeriod={setPeriod}
          periods={["7d", "30d", "6m", "1a"]}
          currentPeriod={period}
          openModal={openModal}
          exportData={{
            reportName: "Usuarios",
            period,
            startDate,
            endDate,
            kpis: {
              "Total usuarios": item.total_users,
              Activos: item.active_users,
              Deshabilitados: item.inactive_users,
              "Nuevos este mes": item.recent_users,
            },
            tableData,
            type: "users",
          }}
        >
          {/* Cards o KPIs principales */}
          <KpisContainer
            firstKpiName={"Total usuarios"}
            firstKpiValue={item.total_users}
            secondKpiName={"Activos"}
            secondKpiValue={item.active_users}
            thirdKpiName={"Deshabilitados"}
            thirdKpiValue={item.inactive_users}
            fourthKpiName={"Nuevos este mes"}
            fourthKpiValue={item.recent_users}
          />

          <ReportCard name={"Crecimiento"} colSpan={12}>
            <UsersAreaChart period={period} />
          </ReportCard>

          <ReportCard name={"Distribución"} colSpan={4}>
            <UsersPieChart period={period} />
          </ReportCard>

          <TableCard tableTitle={"Usuarios recientes"}>
            <UsersTable data={tableData} />
          </TableCard>
        </ReportsContainer>
      ))}
    </>
  );
}
