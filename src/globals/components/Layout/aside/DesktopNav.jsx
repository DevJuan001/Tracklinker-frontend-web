// Constantes
import {
  firstSectionItems,
  secondSectionItems,
} from "../../../constants/asideMenuItems";
// Componentes
import NavItem from "./NavItem";
import Icon from "../../ui/Icon";
import AvatarButton from "./AvatarButton";

export default function DesktopNav({
  user,
  hasRole,
  avatarOnClick,
  helpOnClick,
}) {
  return (
    <nav className="hidden h-full md:flex flex-col justify-between gap-1 order-1">
      {/* Primera Sección */}
      <section className="flex flex-col">
        <AvatarButton
          avatarOnClick={avatarOnClick}
          name={user.name}
          first_surname={user.first_surname}
        />

        <ul
          className="w-full flex gap-[3px]
            md:flex-col
            xl:flex-col"
        >
          {/* Primer sección de opciones */}
          {firstSectionItems
            .filter((item) => hasRole(item.roles))
            .map((item) => (
              <li key={item.name}>
                <NavItem
                  path={item.path}
                  name={item.name}
                  secondName={item.secondName}
                  icon={item.icon}
                />
              </li>
            ))}
        </ul>
      </section>

      {/* Segunda Sección */}
      <section className="order-2 md:py-3.5">
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
                <NavItem path={item.path} name={item.name} icon={item.icon} />
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
  );
}
