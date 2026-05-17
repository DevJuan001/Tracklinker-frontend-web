import { useWarrantiesPieData } from "../../../../hooks/warranties/useWarrantiesPieData";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export default function WarrantiesPieChart({ period }) {
  const { warrantiesData } = useWarrantiesPieData(period);
  return (
    <ResponsiveContainer width={"100%"} height={280}>
      <PieChart width={"100%"} height={"100%"}>
        <Tooltip />
        <Pie
          data={warrantiesData}
          dataKey={"warranties"}
          nameKey={"brand"}
          cornerRadius={"10%"}
          paddingAngle={1}
          innerRadius="80"
          outerRadius="140"
        >
          {warrantiesData.map((item) => (
            <Cell key={item.name} fill={item.color} stroke="#1447e6" />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
