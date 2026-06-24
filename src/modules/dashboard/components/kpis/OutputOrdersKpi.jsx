import KpiCard from "../ui/KpiCard";
import { useOutputOrdersKpi } from "../../hooks/useOutputOrdersKpi";

export default function OutputOrdersKpi() {
  const { orders } = useOutputOrdersKpi();

  return (
    <>
      {orders.map((item) => (
        <KpiCard
          key={"output_orders"}
          background={"output-orders-background"}
          title={"Ordenes de salida"}
          metricValue={item.orders}
          growth={item.new_orders}
        />
      ))}
    </>
  );
}
