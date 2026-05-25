import { useSubcategoriesPieData } from "../../../../hooks/subcategories/useSubcategoriesPieData";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export default function SubcategoriesPieChart({ period }) {
  const { subcategoriesData } = useSubcategoriesPieData(period);
  return (
    <ResponsiveContainer width={"100%"} height={280}>
      <PieChart width={"100%"} height={"100%"}>
        <Tooltip />
        <Pie
          data={subcategoriesData}
          dataKey={"subcategories"}
          nameKey={"category"}
          cornerRadius={"10%"}
          paddingAngle={1}
          innerRadius="80"
          outerRadius="140"
        >
          {subcategoriesData.map((item) => (
            <Cell key={item.category} fill={item.color} stroke="#1447e6" />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
