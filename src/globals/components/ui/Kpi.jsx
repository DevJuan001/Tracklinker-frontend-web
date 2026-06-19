export default function Kpi({ title, value }) {
  return (
    <div
      className="h-[50%] w-[49%] flex flex-col items-start py-3 px-5 gap-1 rounded-3xl bg-[#f5f3f6]
      md:w-full md:h-full md:py-5 md:px-6
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
