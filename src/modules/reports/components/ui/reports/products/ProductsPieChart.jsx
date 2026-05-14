import { useProductsPieData } from "../../../../hooks/products/useProductsPieData";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export default function ProductsPieChart({ period }) {
  const { productsData } = useProductsPieData(period);
  return (
    <ResponsiveContainer width={"100%"} height={280}>
      <PieChart width={"100%"} height={"100%"}>
        <Tooltip />
        <Pie
          data={productsData}
          dataKey={"products"}
          nameKey={"brand"}
          cornerRadius={"10%"}
          paddingAngle={1}
          innerRadius="80"
          outerRadius="140"
        >
          {productsData.map((item) => (
            <Cell key={item.name} fill={item.color} stroke="#1447e6" />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
