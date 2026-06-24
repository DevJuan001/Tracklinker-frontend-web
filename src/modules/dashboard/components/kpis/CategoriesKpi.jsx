import KpiCard from "../ui/KpiCard";
import { useCategoriesKpiData } from "../../hooks/useCategoriesKpiData";

export default function CategoriesKpi() {
  const { categories } = useCategoriesKpiData();
  return (
    <>
      {categories.map((item) => (
        <KpiCard
          key={"categories"}
          background={"categories-background"}
          title={"Categorias"}
          metricValue={item.categories}
          growth={item.new_categories}
        />
      ))}
    </>
  );
}
