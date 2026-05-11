import { useCategoriesChart } from "../../../hooks/useCategoriesChart";
import TopChartsCard from "../TopChartsCard";

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
