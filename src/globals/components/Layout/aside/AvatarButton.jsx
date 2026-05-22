import { avatarItem } from "../../../constants/asideMenuItems";

export default function AvatarButton({ avatarOnClick, name, first_surname }) {
  return (
    <button
      onClick={avatarOnClick}
      className="w-full h-full flex items-center justify-center py-1.5 gap-2.5 rounded-2xl transition duration-300 cursor-pointer
        hover:bg-[#e5e7eb96] 
        dark:text-gray-50 dark:hover:bg-[#202022]
        xl:justify-start xl:pl-6
        "
    >
      <img src={avatarItem.icon} alt={avatarItem.alt} className="w-8 h-8" />

      <div className="hidden text-center xl:block">
        <span className="text-[#75777E] font-medium dark:text-[#7E8088]">
          {name} {first_surname}
        </span>
      </div>
    </button>
  );
}
