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
      className="max-h-[95%] min-h-[95%] grid grid-cols-1 grid-rows-9 gap-5 pb-5 pl-3 transition duration-300 ease-in-out
      md:grid-cols-12 md:grid-rows-5 overflow-y-auto"
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
