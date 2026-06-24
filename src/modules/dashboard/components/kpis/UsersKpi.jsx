import KpiCard from "../ui/KpiCard";
import { useUsersKpiData } from "../../hooks/useUsersKpiData";

export default function UsersKpi() {
  const { usersChartInfo } = useUsersKpiData();

  return (
    <>
      {usersChartInfo.map((item) => (
        <KpiCard
          key={"users"}
          background={
            item.new_users > 0 ? "growth-background" : "users-background"
          }
          title={"Usuarios"}
          metricValue={item.users}
          growth={item.new_users}
        />
      ))}
    </>
  );
}
