import { NavLink } from "react-router-dom";
import Icon from "../../../../globals/components/ui/Icon";

export default function ActionCard({ itemName, itemPath, itemIcon }) {
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
          className="h-20 w-20 rounded-xl bg-[#eae8eb] flex items-center justify-center
          dark:bg-[#101012]
          xl:h-40 xl:w-32
          md:h-40 md:w-32
          sm:h-40 sm:w-32"
        >
          <Icon
            name={itemIcon}
            size={40}
            fill
            color={"#75777E"}
            className="w-10 h-10
            md:w-11 md:h-11"
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
