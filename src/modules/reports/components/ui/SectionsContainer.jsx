import ReportSectionCard from "./ReportSectionCard";
import { useCurrentUser } from "../../../../globals/hooks/useCurrentUser";

export default function SectionsContainer({
  sections,
  setReport,
  setTopSectionVisiblity,
}) {
  setTopSectionVisiblity(true);
  const { hasRole } = useCurrentUser();

  return (
    <section
      className="
        h-full grid grid-cols-3 grid-rows-3 place-items-center gap-1 px-3 pb-12 animate-blurUp
        sm:p-[50px_50px_200px_50px]
        lg:p-[100px_150px_250px_150px]
        xl:grid-cols-4 xl:grid-rows-2 xl:p-[100px_200px_250px_200px] xl:gap-[20px_12px]
        
        "
    >
      {sections
        .filter((item) => hasRole(item.roles))
        .map((section) => (
          <ReportSectionCard
            key={section.name}
            sectionOnClick={() => {
              setReport(`${section.name}`);
              setTopSectionVisiblity(false);
            }}
            sectionKey={section.name}
            sectionIcon={section.icon}
            sectionName={section.cardName}
          />
        ))}
    </section>
  );
}
