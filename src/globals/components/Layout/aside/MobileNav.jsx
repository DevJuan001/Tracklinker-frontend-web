// Hooks
import { useInnerModal } from "../../../hooks/useInnerModal";
// Constantes
import { mobileRelevantItems } from "../../../constants/asideMenuItems";
// Componentes
import NavItem from "./NavItem";
import Icon from "../../ui/Icon";
// Modales
import MobileMenuModal from "./MobileMenuModal";

export default function MobileNav({ hasRole, avatarOnClick, helpOnClick }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();

  return (
    <section
      className="relative w-screen flex justify-between pb-1 pl-1 pr-2
      sm:px-2
      md:hidden"
    >
      <ul
        className="w-auto h-full flex px-1 gap-0.5 rounded-full shadow-[1px_1px_10px_5px_#00000014] bg-white
        dark:bg-black dark:shadow-[1px_1px_1px_4px_#ffffff14]"
      >
        {mobileRelevantItems
          .filter((item) => hasRole(item.roles))
          .map((item) => (
            <li key={item.name} className="py-1.5 rounded-full">
              <NavItem
                itemId={`${item.itemId}-mobile`}
                path={item.path}
                name={item.name}
                icon={item.icon}
              />
            </li>
          ))}
      </ul>

      <button
        onClick={(e) => openInnerModal("menu", e)}
        className="self-end w-auto h-16 flex flex-col items-center justify-center py-2.5 px-5 rounded-full bg-black cursor-pointer group
        dark:bg-white"
      >
        <Icon
          name={"more_horiz"}
          className="text-white group-hover:text-white dark:text-black dark:group-hover:text-black"
        />
      </button>

      {innerType === "menu" && (
        <MobileMenuModal
          isOpen={true}
          triggerRef={innerTrigger}
          onClose={() => openInnerModal(null)}
          helpOnClick={helpOnClick}
          hasRole={hasRole}
          avatarOnClick={avatarOnClick}
        />
      )}
    </section>
  );
}
