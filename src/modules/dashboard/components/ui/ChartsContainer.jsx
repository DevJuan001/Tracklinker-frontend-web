import UsersKpi from "../kpis/UsersKpi";
import ProductsKpi from "../kpis/ProductsKpi";
import BrandsChart from "../charts/BrandsChart";
import CategoriesKpi from "../kpis/CategoriesKpi";
import OutputOrdersChart from "../kpis/OutputOrdersKpi";
import MonthlyInputsChart from "../charts/MonthlyInputsChart";
import WarrantiesPieChart from "../charts/WarrantiesPieChart";
import MonthlyOutputsChart from "../charts/MonthlyOutputsChart";
import SubcategoriesWithStockChart from "../charts/SubcategoriesWithStockChart";

export default function ChartsContainer() {
  return (
    <section
      className="h-[95%] grid grid-cols-1 auto-rows-[minmax(200px,1fr)] gap-4 pb-5 pl-1 transition duration-300 ease-in-out
      md:grid-cols-12 md:grid-rows-[repeat(5,minmax(150px,1fr))] overflow-y-auto"
    >
      {/* Primera Fila de Gráficos */}
      <UsersKpi />

      <ProductsKpi />

      <OutputOrdersChart />

      <CategoriesKpi />

      {/* Segunda Fila de Gráficos */}

      <MonthlyOutputsChart />

      <BrandsChart />

      <WarrantiesPieChart />

      {/* Tercera fila de Gráficos */}

      <SubcategoriesWithStockChart />

      <MonthlyInputsChart />
    </section>
  );
}
