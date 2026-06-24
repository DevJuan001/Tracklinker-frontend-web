import KpiCard from "../ui/KpiCard";
import { useProductsKpiData } from "../../hooks/useProductsKpiData";

export default function ProductsKpi() {
  const { productChartInfo } = useProductsKpiData();

  return (
    <>
      {productChartInfo.map((item) => (
        <KpiCard
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
