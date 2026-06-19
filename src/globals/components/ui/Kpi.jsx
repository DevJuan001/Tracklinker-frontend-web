export default function Kpi({ title, value }) {
  return (
    <div className="h-full w-full flex flex-col items-start py-5 px-6 gap-1 rounded-2xl bg-[#f5f3f6]">
      <span className="text-sm text-[#75777E]">{title}</span>

      <span className="text-2xl font-medium">{value}</span>
    </div>
  );
}
