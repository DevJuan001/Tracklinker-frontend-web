import SupplierActions from "./SupplierActions";
import { usersIcons } from "../../../../assets/icons/usersIcons";
import { userStatus } from "../../../users/constants/userStatus";
import Icon from "../../../../globals/components/ui/Icon";

export default function SupplierItem({
  supplier,
  moreInfoOnClick,
  deleteButtonOnClick,
  editButtonOnClick,
}) {
  return (
    <li
      className="flex items-center justify-between p-5 bg-[#F5F3F6] rounded-xl transition duration-300 cursor-pointer
      hover:bg-[#96929231]
      dark:bg-[#0f0f11] dark:hover:bg-[#212125]"
      hey={supplier.id}
      onClick={moreInfoOnClick}
    >
      {/* Información del proveedor */}
      <article className="flex dark:text-white">
        <address className="flex items-center gap-5 not-italic font-medium">
          <p className="text-[22px]">{supplier.name}</p>

          <div className="hidden sm:flex md:flex lg:flex xl:flex items-center">
            <Icon size={22} name={"phone"} />
            <p>{supplier.phone}</p>
          </div>

          <div className="hidden md:flex lg:flex xl:flex items-center">
            <img
              src={usersIcons.cityIcon}
              alt=""
              className="invert brightness-200 dark:invert-0"
            />
            <p>{supplier.city_name}</p>
          </div>

          <div
            className={`flex items-center px-2 py-1 gap-1 rounded-full border text-xs ${userStatus[supplier.status]?.styles}`}
          >
            <Icon
              size={14}
              name={userStatus[supplier.status]?.icon}
              fill={userStatus[supplier.status]?.fill}
            />
            <span>{userStatus[supplier.status]?.text}</span>
          </div>
        </address>
      </article>
      {/* Botones para interactuar con el proveedor */}
      <SupplierActions
        moreInfoOnClick={moreInfoOnClick}
        editButtonOnClick={editButtonOnClick}
        deleteButtonOnClick={deleteButtonOnClick}
      />
    </li>
  );
}
