import TopChartsCard from "../TopChartsCard";
import { useUsersChart } from "../../../hooks/useUsersChart";

export default function UsersChart() {
  const { usersChartInfo } = useUsersChart();

  return (
    <>
      {usersChartInfo.map((item) => (
        <TopChartsCard
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
