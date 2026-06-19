import Icon from "../../ui/Icon";
import { NavLink } from "react-router-dom";

export default function NavItem({ itemId, path, name, secondName, icon }) {
  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <div
          id={`${itemId}-aside-button`}
          className={`w-auto h-14 flex flex-col items-center py-3 px-6 justify-center subpixel-antialiased rounded-full transition-colors duration-300 group
            md:rounded-2xl md:w-full md:h-full md:py-4
            xl:flex-row xl:pl-6 xl:py-2.5 xl:gap-2.5 xl:justify-start
            ${
              isActive
                ? `bg-black font-medium shadow-[0px_0px_32px_-9px_#000000] text-white fill-white
            dark:bg-white dark:text-black dark:shadow-[0px_0px_32px_-11px_#ffffff] animate-clickEffect`
                : `text-[#75777E] font-normal
            hover:bg-[#e5e7eb96]
            dark:text-[#75777eb7] dark:hover:bg-[#181818]`
            }`}
        >
          <Icon
            name={icon}
            size={25}
            fill={isActive}
            className={`
            ${
              isActive
                ? "fill-white animate-iconFill group-hover:scale-105 dark:fill-black"
                : "text-[#75777eb7] fill-none group-hover:text-black group-hover:[--icon-weight:500] dark:group-hover:text-white"
            }`}
          />

          <div
            className={`hidden gap-1 text-center font-medium text-xs
            ${isActive ? "" : "group-hover:text-black dark:group-hover:text-white"}
            xl:text-base xl:flex
            `}
          >
            <span className="text-nowrap">{name}</span>

            <span className="text-nowrap">{secondName}</span>
          </div>
        </div>
      )}
    </NavLink>
  );
}
