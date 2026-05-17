import { useSuppliersPieData } from "../../../../hooks/suppliers/useSuppliersPieData.js";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export default function SuppliersPieChart({ period }) {
  const { suppliersData } = useSuppliersPieData(period);
  return (
    <ResponsiveContainer width={"100%"} height={280}>
      <PieChart width={"100%"} height={"100%"}>
        <Tooltip />
        <Pie
          data={suppliersData}
          dataKey={"suppliers"}
          nameKey={"brand"}
          cornerRadius={"10%"}
          paddingAngle={1}
          innerRadius="80"
          outerRadius="140"
        >
          {suppliersData.map((item) => (
            <Cell key={item.name} fill={item.color} stroke="#1447e6" />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
