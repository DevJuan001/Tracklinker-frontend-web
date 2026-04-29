import TopChartsCard from "../TopChartsCard";
import { useOutputOrdersChart } from "../../../hooks/useOutputOrdersChart";

export default function OutputOrdersChart() {
  const { orders } = useOutputOrdersChart();

  return (
    <>
      {orders.map((item) => (
        <TopChartsCard
          background={"output-orders-background"}
          title={"Ordenes de salida"}
          metricValue={item.orders}
          growth={item.new_orders}
        />
      ))}
    </>
  );
}
