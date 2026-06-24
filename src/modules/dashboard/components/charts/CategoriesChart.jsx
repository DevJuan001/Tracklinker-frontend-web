import TopChartsCard from "../ui/TopChartsCard";
import { useCategoriesChart } from "../../hooks/useCategoriesChart";

export default function CategoriesChart() {
  const { categories } = useCategoriesChart();
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
