import TopChartsCard from "../ui/TopChartsCard";
import { useProductsKpiData } from "../../hooks/useProductsKpiData";

export default function ProductsKpi() {
  const { productChartInfo } = useProductsKpiData();

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
