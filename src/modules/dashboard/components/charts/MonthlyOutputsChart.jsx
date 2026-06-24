import {
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "../ui/ChartCard";
import { useMonthlyOutputsChartData } from "../../hooks/useMonthlyOutputsChartData";

export default function MonthlyOutputsChart() {
  const { monthlyOutputsData } = useMonthlyOutputsChartData();

  return (
    <ChartCard
      rowSpan={2}
      colSpan={6}
      name={`Salidas Mensuales del ${new Date().getFullYear()}`}
    >
      <ResponsiveContainer>
        <AreaChart data={monthlyOutputsData} margin={{ left: 30 }}>
          <YAxis width="auto" fontSize={"11px"} />

          <XAxis dataKey={"month"} fontSize={"10px"} />

          <Tooltip />

          <CartesianGrid vertical={false} stroke="#e5e7eb" />

          <Area
            type={"natural"}
            dataKey={"output_orders"}
            stroke="#152DD1"
            fill="#152DD1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
