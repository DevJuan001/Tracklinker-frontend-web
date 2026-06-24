import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "../ui/ChartCard";
import { useBrandsChart } from "../../hooks/useBrandsChart";

export default function BrandsChart() {
  const { brandChartInfo } = useBrandsChart();

  return (
    <ChartCard rowSpan={2} colSpan={3} name={"Marcas con más unidades"}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={brandChartInfo}>
          <YAxis width={10} fontSize={11} />

          <XAxis dataKey={"brand"} fontSize={"8px"} />

          <Bar
            dataKey={"products"}
            fill="#152DD1"
            background={"#000"}
            radius={[8, 8, 0, 0]}
          />

          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
