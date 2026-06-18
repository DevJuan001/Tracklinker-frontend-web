import Icon from "../../../../globals/components/ui/Icon";
import { userStatus } from "../../../users/constants/userStatus";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";

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
          <span className="text-[22px]">{supplier.name}</span>

          <div className="hidden sm:flex md:flex lg:flex xl:flex items-center gap-1">
            <Icon size={22} name={"phone"} />

            <span>{supplier.phone}</span>
          </div>

          <div className="hidden md:flex lg:flex xl:flex items-center gap-1">
            <Icon name={"globe_location_pin"} size={20} fill />

            <span>{supplier.city_name}</span>
          </div>

          <div
            className={`flex items-center px-2 py-1 gap-1 rounded-xl border text-xs ${userStatus[supplier.status]?.styles}`}
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
      <ActionButtons
        moreInfoButtonOnClick={moreInfoOnClick}
        editButtonOnClick={editButtonOnClick}
        deleteButtonOnClick={deleteButtonOnClick}
      />
    </li>
  );
}
