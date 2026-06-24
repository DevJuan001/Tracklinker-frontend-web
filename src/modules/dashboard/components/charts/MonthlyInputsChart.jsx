import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useMonthlyInputsChartData } from "../../hooks/useMonthlyInputsChartData";
import ChartCard from "../ui/ChartCard";

// Grafico de barras
export default function MonthlyInputsChart() {
  const { monthlyInputsData } = useMonthlyInputsChartData();

  return (
    // Contenedor del gráfico
    <ChartCard
      colSpan={4}
      rowSpan={2}
      name={"Entradas Mensuales de cada proveedor"}
      imageDisplay={"hidden"}
    >
      <ResponsiveContainer height={"100%"}>
        <BarChart data={monthlyInputsData}>
          <YAxis width="auto" />

          <XAxis dataKey={"supplier_name"} fontSize={"6px"} fontWeight={800} />

          <Tooltip />

          <Bar dataKey="orders" fill="#152DD1" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
