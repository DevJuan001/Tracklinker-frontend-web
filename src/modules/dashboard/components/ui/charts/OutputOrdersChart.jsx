import TopChartsCard from "../TopChartsCard";
import { useOutputOrdersChart } from "../../../hooks/useOutputOrdersChart";

export default function OutputOrdersChart() {
  const { orders, loading, error } = useOutputOrdersChart();
  return (
    <TopChartsCard
      background={"output-orders-background"}
      title={"Ordenes de salida"}
    >
      {orders.map((item) => (
        <div className="flex items-center gap-1" key={item.orders}>
          {/* Ordenes existentes */}
          <span className="font-semibold text-2xl">{item.orders}</span>
          {/* Ordenes creadas en el mes actual */}
          <span className="font-medium text-base text-[#00a86b]">
            +{item.new_orders}
          </span>
        </div>
      ))}
    </TopChartsCard>
  );
}
