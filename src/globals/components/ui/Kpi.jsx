export default function Kpi({ title, value }) {
  return (
    <div
      className="h-full w-full flex flex-col items-start py-5 px-6 gap-1 rounded-2xl bg-[#f5f3f6]
      dark:bg-[#101012]"
    >
      <span
        className="text-sm text-[#75777E]
        dark:text-[#7E8088]"
      >
        {title}
      </span>

      <span
        className="text-2xl font-medium
        dark:text-[#E2E4E5]"
      >
        {value}
      </span>
    </div>
  );
}
