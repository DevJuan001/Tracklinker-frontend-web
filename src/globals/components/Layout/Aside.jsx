// Hooks
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useModal } from "../../hooks/useModal";
import { NavLink } from "react-router-dom";
// Constants
import {
  avatarItem,
  firstSectionItems,
  secondSectionItems,
  mobileRelevantItems,
  mobileItems,
} from "../../../constants/asideMenuItems";
// Components
import Icon from "../ui/Icon";
import Modal from "../modals/Modal";

// Menú lateral principal de opciones
export default function Aside({ avatarOnClick, helpOnClick }) {
  const { user } = useCurrentUser();
  const { modalType, isOpen, triggerRef, openModal, closeModal } = useModal();

  return (
    <aside
      className="sticky bottom-0 flex order-2 h-[80px] py-1 z-10
      md:static md:h-full md:flex-col md:order-1 md:px-5 md:pt-5
      xl:h-full xl:flex-col xl:row-span-2 xl:px-3 xl:pt-5 xl:order-1
      dark:bg-black"
    >
      {/* Menús de opciones - Mobile */}
      <section
        className="relative w-screen flex justify-between pb-1 pl-1 pr-2
        sm:px-2
        md:hidden"
      >
        <ul
          className="w-auto h-full flex px-1 gap-0.5 rounded-full shadow-[1px_1px_10px_5px_#00000014] bg-white
        dark:bg-black dark:shadow-[1px_1px_1px_4px_#ffffff14]"
        >
          {mobileRelevantItems.map((item) => (
            <li key={item.name} className="py-1.5 rounded-full">
              <NavLink to={item.path}>
                {({ isActive }) => (
                  <section
                    className={`w-auto h-full flex flex-col py-2.5 px-6 items-center justify-center subpixel-antialiased rounded-full transition duration-300 group
                    ${
                      isActive
                        ? `bg-black font-medium shadow-[0px_0px_32px_-9px_#000000] text-white fill-white
                    dark:bg-white dark:text-black dark:shadow-[0px_0px_32px_-11px_#ffffff] animate-clickEffect`
                        : `text-[#75777E] font-normal hover:bg-[#e5e7eb96] dark:text-[#7E8088] dark:hover:bg-[#181818]`
                    }`}
                  >
                    <Icon
                      name={item.icon}
                      fill={isActive}
                      className={`group-hover:stroke-black
                      ${
                        isActive
                          ? "fill-white scale-105 stroke-none animate-iconFill dark:fill-black"
                          : "text-[#75777E] fill-none dark:group-hover:text-white"
                      }`}
                    />
                  </section>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div
          onClick={(e) => openModal(null, "menu", null, e.currentTarget)}
          className="self-end w-auto h-16 flex flex-col items-center justify-center py-2.5 px-5 rounded-full bg-black cursor-pointer group
          dark:bg-white"
        >
          <Icon
            name={"more_horiz"}
            className="text-white group-hover:text-white dark:text-black dark:group-hover:text-black"
          />
        </div>

        {modalType && (
          <Modal
            isOpen={isOpen}
            triggerRef={triggerRef}
            onClose={closeModal}
            growDirection="top-left"
            type={"menu"}
          >
            {modalType === "menu" && (
              <div>
                <button
                  onClick={avatarOnClick}
                  className="w-full h-full flex items-center justify-center py-2.5 px-4 gap-2.5 rounded-3xl transition duration-300
                  hover:bg-[#e5e7eb96]
                  dark:text-[#7E8088] dark:hover:bg-[#181818]
                  xl:justify-start"
                >
                  <img
                    src={avatarItem.icon}
                    alt={avatarItem.alt}
                    className="w-8 h-8"
                  />
                </button>
                {mobileItems.map((item) => (
                  <NavLink to={item.path} key={item.name}>
                    {({ isActive }) => (
                      <div
                        className={`w-auto h-14 flex flex-col py-2.5 px-5 items-center justify-center subpixel-antialiased rounded-full transition duration-300 group
                          ${
                            isActive
                              ? `bg-black font-medium shadow-[0px_0px_32px_-9px_#000000] text-white fill-white
                          dark:bg-white dark:text-black dark:shadow-[0px_0px_32px_-11px_#ffffff] animate-clickEffect`
                              : `text-[#75777E] font-normal hover:bg-[#e5e7eb96] dark:text-[#7E8088] dark:hover:bg-[#181818]`
                          }`}
                      >
                        <Icon
                          name={item.icon}
                          fill={isActive}
                          className={`
                      ${
                        isActive
                          ? "group-hover:scale-105 animate-iconFill dark:fill-black"
                          : "text-[#75777E] group-hover:text-black group-hover:[--icon-weight:600] dark:group-hover:text-white"
                      }`}
                        />
                      </div>
                    )}
                  </NavLink>
                ))}
              </div>
            )}
          </Modal>
        )}
      </section>

      {/* Menús de opciones - Desktop */}
      <nav className="hidden h-full md:flex xl:flex flex-col justify-between gap-1 order-1">
        {/* Primera Sección */}
        <section className="flex">
          <ul
            className="min-w-full flex gap-[3px]
            md:flex-col
            xl:flex-col"
          >
            <li
              onClick={avatarOnClick}
              className="w-full h-full flex items-center justify-center py-1.5 gap-2.5 rounded-2xl transition duration-300 cursor-pointer
            hover:bg-[#e5e7eb96] 
            dark:text-gray-50 dark:hover:bg-[#202022]
            xl:justify-start xl:pl-6
            "
            >
              <img
                src={avatarItem.icon}
                alt={avatarItem.alt}
                className="w-8 h-8"
              />

              <div className="hidden text-center xl:block">
                <span className="text-[#75777E] font-medium dark:text-[#7E8088]">
                  {user.name} {user.first_surname}
                </span>
              </div>
            </li>
            {/* Esto lo que hace es recorrer la constante y traer los datos uno a uno e ir creando un li para cada uno */}
            {firstSectionItems.map((item) => (
              <li key={item.name}>
                <NavLink to={item.path}>
                  {({ isActive }) => (
                    <section
                      className={`w-auto h-14 flex flex-col items-center py-3 justify-center subpixel-antialiased rounded-2xl transition duration-300 group
                        md:w-full md:h-full md:py-4
                        xl:w-full xl:h-full xl:flex-row xl:pl-6 xl:py-2.5 xl:gap-2.5 xl:justify-start
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
                        name={item.icon}
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
                        className={`flex gap-1 text-center font-medium
                        ${isActive ? "" : "group-hover:text-black dark:group-hover:text-white"}
                        `}
                      >
                        <span
                          className="text-nowrap text-xs  
                          md:hidden 
                          xl:block xl:text-base"
                        >
                          {item.name}
                        </span>
                        <span
                          className="text-nowrap text-xs hidden
                          xl:block xl:text-base"
                        >
                          {item.nameTwo}
                        </span>
                      </div>
                    </section>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
        {/* Segunda Sección */}
        <section
          className="order-2
            md:py-3
            xl:py-4"
        >
          <ul className="flex flex-col gap-1">
            <span className="text-sm text-[#75777eb7] pb-2 md:pl-1 xl:pl-3">
              Otros
            </span>
            {secondSectionItems.map((item) => (
              <li
                key={item.name}
                className="rounded-2xl transition duration-300 text-[#75777E] font-normal
                hover:bg-[#e5e7eb96]
                dark:text-[#7E8088] dark:hover:bg-[#181818]"
              >
                {item.path ? (
                  <NavLink to={item.path} onClick={item.onClick}>
                    <section
                      className="h-14 flex items-center justify-center gap-2.5 py-2.5 subpixel-antialiased group
                      dark:text-[#7E8088]
                      md:pl-0
                      xl:w-full xl:h-auto xl:justify-start xl:pl-7"
                    >
                      <Icon
                        name={item.icon}
                        size={25}
                        className="fill-none text-[#75777eb7]
                        group-hover:text-black group-hover:[--icon-weight:600]
                        dark:group-hover:text-white"
                      />
                      <span
                        className="hidden font-medium group-hover:text-black dark:group-hover:text-white
                        xl:block"
                      >
                        {item.name}
                      </span>
                    </section>
                  </NavLink>
                ) : (
                  <button onClick={helpOnClick} className="w-full">
                    <section
                      className="w-full h-14 flex items-center justify-center gap-2.5 py-2.5 subpixel-antialiased group
                      dark:text-[#7E8088]
                      md:pl-0
                      xl:w-full xl:h-auto xl:justify-start xl:pl-7"
                    >
                      <Icon
                        name={item.icon}
                        size={25}
                        className={`fill-none text-[#75777eb7]
                        group-hover:text-black group-hover:[--icon-weight:500]
                        dark:group-hover:text-white`}
                      />
                      <span
                        className="hidden font-medium group-hover:text-black dark:group-hover:text-white 
                        xl:block"
                      >
                        {item.name}
                      </span>
                    </section>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>
      </nav>
    </aside>
  );
}
