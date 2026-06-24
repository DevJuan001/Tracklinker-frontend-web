import {
  Pie,
  PieChart,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useWarrantiesChartData } from "../../hooks/useWarrantiesChartData";
import ChartCard from "../ui/ChartCard";

export default function WarrantiesPieChart() {
  const { warrantiesChartData } = useWarrantiesChartData();

  return (
    <ChartCard rowSpan={4} colSpan={3} name={"Estados de garantías"}>
      <ResponsiveContainer>
        <PieChart>
          <Tooltip />

          <Pie
            data={warrantiesChartData}
            dataKey={"value"}
            nameKey={"name"}
            cornerRadius="50%"
            innerRadius="80%"
            outerRadius="100%"
            paddingAngle={5}
          >
            {warrantiesChartData.map((item, index) => (
              <Cell key={index} fill={item.color} stroke={item.color} />
            ))}
            <Legend />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
