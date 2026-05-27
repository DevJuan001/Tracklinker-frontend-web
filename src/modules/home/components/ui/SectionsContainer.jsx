import ActionCard from "./ActionCard";
import { items } from "../../constants/homeSections";
import { useCurrentUser } from "../../../../globals/hooks/useCurrentUser";

export default function SectionsContainer() {
  const { hasRole } = useCurrentUser();
  const itemsPerRole = items.filter((item) => hasRole(item.roles));

  return (
    <section
      className={`h-[90%] grid grid-cols-3 p-[40px_13px_20px] gap-[20px_20px] place-items-center
        ${
          itemsPerRole.length > 6
            ? `grid-rows-3
              sm:p-[80px_20px_150px_20px]
              md:p-[80px_20px_150px_20px]
              lg:grid-cols-5 lg:grid-rows-2 lg:p-[100px_100px_250px_100px]
              xl:p-[100px_80px_180px_80px]
              2xl:p-[140px_250px_240px_250px]`
            : `grid-rows-2
              sm:p-[80px_20px_150px_20px]
              md:grid-rows-2 md:p-[100px_100px_250px_100px]
              lg:p-[100px_100px_250px_100px]
              xl:p-[140px_150px_240px_150px]
              2xl:p-[150px_380px_240px_380px]`
        }
      `}
    >
      {itemsPerRole.map((item) => (
        <ActionCard
          key={item.name}
          itemName={item.name}
          itemPath={item.path}
          itemIcon={item.icon}
        />
      ))}
    </section>
  );
}
