import { NavLink } from "react-router-dom";

export default function ActionCard({
  itemName,
  itemPath,
  itemIcon: Icon,
  itemAlt,
}) {
  return (
    <section>
      {/* Card de cada modulo */}
      <NavLink
        to={itemPath}
        key={itemName}
        className="flex flex-col h-32 w-28 place-items-center gap-2 transition duration-300
        hover:scale-105
        xl:h-40 xl:w-32
        md:h-40 md:w-32
        sm:h-36 sm:w-32"
      >
        <section
          className="h-20 w-20 rounded-xl bg-[#eae8eb] content-center justify-items-center
          dark:bg-[#101012]
          xl:h-40 xl:w-32
          md:h-40 md:w-32
          sm:h-40 sm:w-32"
        >
          <Icon
            aria-label={itemAlt}
            className="w-8 h-10 fill-[#75777E] 
            md:w-10 md:h-10
            xl:w-10 xl:h-10"
          />
        </section>
        <p
          className="text-xs font-medium text-center dark:text-white
        md:text-base
        xl:text-base"
        >
          {itemName}
        </p>
      </NavLink>
    </section>
  );
}
