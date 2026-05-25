import Icon from "../../../../globals/components/ui/Icon";

export default function ReportSectionCard({
  sectionOnClick,
  sectionKey,
  sectionName,
  sectionIcon,
}) {
  return (
    <button
      onClick={sectionOnClick}
      key={sectionKey}
      className="flex flex-col h-auto w-36 place-items-center gap-2 transition duration-300
      hover:scale-[1.05]
      xl:h-48 xl:w-32"
    >
      <div
        className="h-24 w-24 rounded-xl bg-[#eae8eb] flex items-center justify-center
          dark:bg-[#101012]
          xl:h-32 xl:w-32
          sm:h-28 sm:w-28"
      >
        <Icon name={sectionIcon} size={50} fill color={"#75777E"} />
      </div>

      <span className="text-sm font-medium text-center dark:text-white">
        {sectionName}
      </span>
    </button>
  );
}
