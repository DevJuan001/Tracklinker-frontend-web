import {
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useAreaChart } from "../../hooks/useAreaChart";
import ChartCard from "../ui/ChartCard";

export default function SimpleAreaChart() {
  const { areaChartInfo } = useAreaChart();

  return (
    <ChartCard
      rowSpan={2}
      colSpan={6}
      bgColor={""}
      name={"Salidas Mensuales del año"}
    >
      <div className="w-full flex-1 min-h-[200px] min-w-0 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={areaChartInfo} margin={{ left: 20 }}>
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
      </div>
    </ChartCard>
  );
}
