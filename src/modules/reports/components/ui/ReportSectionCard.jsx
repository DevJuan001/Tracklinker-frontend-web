export default function ReportSectionCard({
  sectionOnClick,
  sectionKey,
  sectionName,
  sectionIcon: Icon,
  sectionIconAlt,
}) {
  return (
    <button
      onClick={sectionOnClick}
      key={sectionKey}
      className="flex flex-col h-36 w-36 place-items-center gap-2 transition duration-300
        hover:scale-[1.1]
        xl:h-48 xl:w-32"
    >
      <section
        className="h-20 w-20 rounded-xl bg-[#eae8eb] content-center justify-items-center
            dark:bg-[#101012]
            xl:h-32 xl:w-32
            md:h-28 md:w-28
            sm:h-28 sm:w-28"
      >
        <Icon
          alt={sectionIconAlt}
          className="w-10 h-10 fill-[#75777E] dark:invert"
        />
      </section>
      <p className="text-sm font-medium text-center dark:text-white">
        {sectionName}
      </p>
    </button>
  );
}
