import Modal from "../../modals/Modal";
import { avatarItem, mobileItems } from "../../../constants/asideMenuItems";
import { NavLink } from "react-router-dom";
import Icon from "../../ui/Icon";
import NavItem from "./NavItem";

export default function MobileMenuModal({
  isOpen,
  triggerRef,
  onClose,
  avatarOnClick,
  helpOnClick,
}) {
  return (
    <Modal
      isOpen={isOpen}
      type={"menu"}
      onClose={onClose}
      triggerRef={triggerRef}
    >
      <button
        onClick={avatarOnClick}
        className="w-full h-full flex items-center justify-center py-2.5 px-4 gap-2.5 rounded-3xl transition duration-300
        hover:bg-[#e5e7eb96]
        dark:text-[#7E8088] dark:hover:bg-[#181818]
        xl:justify-start"
      >
        <img src={avatarItem.icon} alt={avatarItem.alt} className="w-8 h-8" />
      </button>

      {mobileItems.map((item) =>
        item.path ? (
          <NavItem
            key={item.path}
            path={item.path}
            name={item.name}
            icon={item.icon}
          />
        ) : (
          <button key={item.name} onClick={helpOnClick} className="w-full">
            <div
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
              <span className="hidden font-medium group-hover:text-black dark:group-hover:text-white">
                {item.name}
              </span>
            </div>
          </button>
        ),
      )}
    </Modal>
  );
}
