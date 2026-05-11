import {
  Pie,
  PieChart,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { usePieChart } from "../../../hooks/usePieChart";
import ChartCard from "../ChartCard";

export default function SimplePieChart() {
  const { simplePieChartData } = usePieChart();

  return (
    <ChartCard rowSpan={4} colSpan={3} name={"Estados de garantías"}>
      <div className="w-full h-full min-h-[200px]">
        <ResponsiveContainer>
          <PieChart>
            <Tooltip />
            <Pie
              data={simplePieChartData}
              dataKey={"value"}
              nameKey={"name"}
              cornerRadius="50%"
              innerRadius="80%"
              outerRadius="100%"
              paddingAngle={5}
            >
              {simplePieChartData.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
              <Legend />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
