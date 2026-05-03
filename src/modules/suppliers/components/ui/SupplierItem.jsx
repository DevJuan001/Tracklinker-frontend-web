import SupplierActions from "./SupplierActions";
import { userStatus } from "../../../users/constants/userStatus";
import Icon from "../../../../globals/components/ui/Icon";
import Avatar from "../../../../globals/components/ui/Avatar";

export default function SupplierItem({
  supplier,
  moreInfoOnClick,
  deleteButtonOnClick,
  editButtonOnClick,
}) {
  return (
    <li
      className="flex items-center justify-between p-5 bg-[#F5F3F6] rounded-xl transition duration-300 cursor-pointer
      hover:bg-[#efedf0]
      dark:bg-[#0f0f11] dark:hover:bg-[#212125]"
      hey={supplier.id}
      onClick={moreInfoOnClick}
    >
      {/* Información del proveedor */}
      <article className="flex dark:text-white">
        <address className="flex items-center gap-5 not-italic font-medium">
          <div className="flex items-center gap-2">
            <Avatar user={supplier} size={35} />

            <span className="text-[22px]">{supplier.name}</span>
          </div>

          <div className="hidden sm:flex md:flex lg:flex xl:flex items-center gap-1">
            <Icon size={22} name={"phone"} />
            <span>{supplier.phone}</span>
          </div>

          <div className="hidden md:flex lg:flex xl:flex items-center gap-1">
            <Icon name={"globe_location_pin"} size={20} fill />
            <span>{supplier.city_name}</span>
          </div>

          <div
            className={`flex items-center px-2 py-1 gap-1 rounded-lg border text-xs ${userStatus[supplier.status]?.styles}`}
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
