import UsersKpi from "../kpis/UsersKpi";
import ProductsKpi from "../kpis/ProductsKpi";
import BrandsChart from "../charts/BrandsCharts";
import CategoriesKpi from "../kpis/CategoriesKpi";
import SimpleBarChart from "../charts/SimpleBarChart";
import SimplePieChart from "../charts/SimplePieChart";
import SimpleAreaChart from "../charts/SimpleAreaChart";
import OutputOrdersChart from "../kpis/OutputOrdersKpi";
import SubcategoriesWithStockChart from "../charts/SubcategoriesWithStockChart";

export default function ChartsContainer() {
  return (
    <section
      className="h-[95%] grid grid-cols-1 auto-rows-[minmax(200px,1fr)] gap-5 pb-5 pl-1 transition duration-300 ease-in-out
      md:grid-cols-12 md:grid-rows-[repeat(5,minmax(150px,1fr))] overflow-y-auto"
    >
      {/* Primera Fila de Gráficos */}
      <UsersKpi />

      <ProductsKpi />

      <OutputOrdersChart />

      <CategoriesKpi />

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
