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
        /* Layout Base */
        h-full grid grid-cols-3 grid-rows-3 place-items-center animate-blurUp

        /* Espaciados */
        gap-[20px_12px]

        /* Responsive Paddings */
        px-3 py-4
        xl:p-[100px_250px_250px_300px] xl:grid-cols-4 xl:grid-rows-2
        lg:p-[100px_150px_250px_150px]
        md:p-[50px_50px_200px_50px]
        sm:p-[50px_50px_200px_50px]
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
