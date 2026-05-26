import { items } from "../../constants/homeSections";
import ActionCard from "./ActionCard";

export default function SectionsContainer() {
  return (
    <section
      className="min-h-[90%] grid grid-cols-3 grid-rows-3 p-[40px_13px_20px] gap-[20px_12px] place-items-center
      md:grid-cols-5 md:grid-rows-2 md:p-[50px_10px_200px_10px]
      lg:p-[100px_100px_250px_100px]
      xl:p-[140px_80px_240px_80px]
      2xl:p-[140px_250px_240px_250px]
      "
    >
      {items.map((item) => (
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
