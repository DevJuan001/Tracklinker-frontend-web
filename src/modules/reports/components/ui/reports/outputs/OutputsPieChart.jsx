import { useOutputsPieData } from "../../../../hooks/outputs/useOutputsPieData.js";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export default function OutputsPieChart({ period }) {
  const { outputsData } = useOutputsPieData(period);

  return (
    <ResponsiveContainer width={"100%"} height={280}>
      <PieChart width={"100%"} height={"100%"}>
        <Tooltip />
        <Pie
          data={outputsData}
          dataKey={"outputs"}
          nameKey={"brand"}
          cornerRadius={"10%"}
          paddingAngle={1}
          innerRadius="80"
          outerRadius="140"
        >
          {outputsData.map((item) => (
            <Cell key={item.name} fill={item.color} stroke="#1447e6" />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
