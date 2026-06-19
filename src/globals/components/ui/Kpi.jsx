export default function Kpi({ title, value }) {
  return (
    <div
      className="h-full w-full flex flex-col items-start py-3 px-4 gap-1 rounded-2xl bg-[#f5f3f6]
      md:py-5 md:px-6
      dark:bg-[#101012]"
    >
      <span
        className="text-xs text-[#75777E]
        md:text-sm
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
