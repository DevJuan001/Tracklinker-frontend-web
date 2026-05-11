import UsersChart from "./charts/UsersChart";
import SimpleAreaChart from "./charts/SimpleAreaChart";
import SimpleBarChart from "./charts/SimpleBarChart";
import SimplePieChart from "./charts/SimplePieChart";
import ProductsChart from "./charts/ProductsChart";
import BrandsChart from "./charts/BrandsCharts";
import OutputOrdersChart from "./charts/OutputOrdersChart";
import SubcategoriesWithStockChart from "./charts/SubcategoriesWithStockChart";
import CategoriesChart from "./charts/CategoriesChart";

export default function ChartsContainer() {
  return (
    <section
      className="h-[95%] grid grid-cols-1 auto-rows-[minmax(200px,1fr)] gap-5 pb-5 pl-1 transition duration-300 ease-in-out
      md:grid-cols-12 md:grid-rows-[repeat(5,minmax(150px,1fr))] overflow-y-auto"
    >
      {/* Primera Fila de Gráficos */}
      <UsersChart />
      <ProductsChart />
      <OutputOrdersChart />
      <CategoriesChart />
      {/* Segunda Fila de Gráficos */}
      <SimpleAreaChart />
      <BrandsChart />
      <SimplePieChart />
      {/* Tercera fila de Gráficos */}
      <SubcategoriesWithStockChart />
      <SimpleBarChart />
    </section>
  );
}
