import { useUsersPieData } from "../../../../hooks/users/useUsersPieData";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export default function UsersPieChart({ period }) {
  const { usersData } = useUsersPieData(period);
  return (
    <ResponsiveContainer width={"100%"} height={280}>
      <PieChart width={"100%"} height={"100%"}>
        <Tooltip />
        <Pie
          data={usersData}
          cy={"85%"}
          dataKey={"users"}
          nameKey={"rol"}
          startAngle={180}
          endAngle={0}
          cornerRadius={"10%"}
          paddingAngle={1}
          innerRadius="100"
          outerRadius="150"
        >
          {usersData.map((item, index) => (
            <Cell key={index} fill={item.color} stroke="#1447e6" />
          ))}
        </Pie>
        <Legend
          layout="vertical"
          formatter={(value, entry) => {
            return `${entry.payload.rol}: ${entry.payload.users}`;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
