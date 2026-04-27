import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  YAxis,
  XAxis,
} from "recharts";
import { useOutputsAreaData } from "../../../../hooks/outputs/useOutputsAreaData.js";

export default function OutputsAreaChart({ period }) {
  const { outputsData } = useOutputsAreaData(period);
  return (
    <ResponsiveContainer width={"100%"} height={290}>
      <AreaChart
        data={outputsData}
        height={"70%"}
        width={"100%"}
        responsive
        margin={{ left: 25, right: 5 }}
      >
        <YAxis width="auto" fontSize={"10px"} />
        <XAxis fontSize={"10px"} dataKey={"month"} />
        <Tooltip />

        {/* Grandiente aplicada al gráfico */}
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1447e6" stopOpacity={1} />
            <stop offset="95%" stopColor="#1447e6" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <Area
          type={"natural"}
          dataKey={"outputs"}
          stroke="#1447e6"
          fill="url(#color)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
