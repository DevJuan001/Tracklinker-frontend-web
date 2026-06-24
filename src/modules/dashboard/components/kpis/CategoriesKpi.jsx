import TopChartsCard from "../ui/TopChartsCard";
import { useCategoriesKpiData } from "../../hooks/useCategoriesKpiData";

export default function CategoriesKpi() {
  const { categories } = useCategoriesKpiData();
  return (
    <>
      {categories.map((item) => (
        <TopChartsCard
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
