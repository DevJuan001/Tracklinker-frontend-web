import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import useBarChart from "../../../hooks/useBarChart";
import ChartCard from "../ChartCard";

// Grafico de barras
export default function SimpleBarChart() {
  const { barChartData } = useBarChart();

  return (
    // Contenedor del gráfico
    <ChartCard
      colSpan={4}
      rowSpan={2}
      name={"Entradas Mensuales de cada proveedor"}
      imageDisplay={"hidden"}
    >
      <ResponsiveContainer>
        <BarChart data={barChartData}>
          <YAxis width="auto" />
          <XAxis dataKey={"supplier_name"} fontSize={"6px"} fontWeight={800} />
          <Tooltip />
          <Bar dataKey="orders" fill="#152DD1" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
