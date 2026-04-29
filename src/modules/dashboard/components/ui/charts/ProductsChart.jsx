import TopChartsCard from "../TopChartsCard";
import { useProductChart } from "../../../hooks/useProductChart";

export default function ProductsChart() {
  const { productChartInfo } = useProductChart();

  return (
    <>
      {productChartInfo.map((item) => (
        <TopChartsCard
          background={"products-background"}
          title={"Productos"}
          metricValue={item.products}
          growth={item.new_products}
        />
      ))}
    </>
  );
}
