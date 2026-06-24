import TopChartsCard from "../ui/TopChartsCard";
import { useProductChart } from "../../hooks/useProductChart";

export default function ProductsChart() {
  const { productChartInfo } = useProductChart();

  return (
    <>
      {productChartInfo.map((item) => (
        <TopChartsCard
          key={"products"}
          background={"products-background"}
          title={"Productos"}
          metricValue={item.products}
          growth={item.new_products}
        />
      ))}
    </>
  );
}
