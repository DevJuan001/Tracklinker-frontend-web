// Gráficos
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
      className="grid max-h-[95%] h-full p-2 transition duration-300 ease-in-out
            xl:grid-cols-12 xl:grid-rows-5
            sm:grid-cols-1 sm:grid-rows-4 gap-5"
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
