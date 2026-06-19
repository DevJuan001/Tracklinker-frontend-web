// Hooks
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Constants
import { userStatus } from "../../../users/constants/userStatus";
// Components
import Icon from "../../../../globals/components/ui/Icon";
import Avatar from "../../../../globals/components/ui/Avatar";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import EditSupplierInfoModal from "./EditSupplierInfoModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";

export default function MoreInfoSupplierModal({ supplier, onClose }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <section
      className="flex flex-col items-center
      dark:text-[#E2E4E5]"
    >
      <div className="w-full self-start flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar user={supplier} size={50} />

            <span className="text-4xl leading-none font-medium">
              {supplier.name}
            </span>
          </div>

          <div
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-xl
            ${userStatus[supplier.status]?.styles}`}
          >
            <Icon
              name={userStatus[supplier.status]?.icon}
              size={14}
              fill={userStatus[supplier.status]?.fill}
            />

            <span className="text-xs font-medium">
              {userStatus[supplier.status]?.text}
            </span>
          </div>
        </div>

        <div className="flex flex-col mt-3">
          <span
            className="text-sm text-[#7e777ed0] 
            dark:text-[#b4aab4]"
          >
            Teléfono
          </span>

          <span>{supplier.phone}</span>
        </div>

        <div className="flex flex-col">
          <span
            className="text-sm text-[#7e777ed0] 
            dark:text-[#b4aab4]"
          >
            Correo electrónico
          </span>

          <span>{supplier.email}</span>
        </div>

        <div className="flex flex-col">
          <span
            className="text-sm text-[#7e777ed0] 
            dark:text-[#b4aab4]"
          >
            Ciudad
          </span>

          <span>{supplier.city_name}</span>
        </div>

        <div className="flex flex-col">
          <span
            className="text-sm text-[#7e777ed0] 
            dark:text-[#b4aab4]"
          >
            Dirección
          </span>

          <span>{supplier.address}</span>
        </div>

        <div className="flex flex-col">
          <span
            className="text-sm text-[#7e777ed0] 
            dark:text-[#b4aab4]"
          >
            Fecha de creación
          </span>

          <span>{supplier.date}</span>
        </div>
      </div>

      <ConfirmCancelButtons
        confirmText="Editar"
        confirmButtonOnClick={(e) => openInnerModal("edit", e)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "edit" && (
        <AddInnerModal
          isOpen={true}
          onClose={() => {
            closeInnerModal();
            onClose();
          }}
          title={"Editar Proveedor"}
          triggerRef={innerTrigger}
        >
          <EditSupplierInfoModal
            supplier={supplier}
            onClose={() => {
              closeInnerModal();
              onClose();
            }}
          />
        </AddInnerModal>
      )}
    </section>
  );
}
