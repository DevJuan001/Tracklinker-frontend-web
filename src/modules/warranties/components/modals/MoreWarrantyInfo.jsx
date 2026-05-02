import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
import Icon from "../../../../globals/components/ui/Icon";
import Loader from "../../../../globals/components/ui/Loader";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { warrantyStatusConfig } from "../../constants/warrantyStatus";
import { useEditWarrantyStatus } from "../../hooks/useEditWarrantyStatus";
import EditWarrantyModal from "./EditWarrantyModal";

export default function MoreWarrantyInfo({ modalData, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { handleStatusChange, loading } = useEditWarrantyStatus(modalData);

  return (
    <div className="flex flex-col justify-center items-center not-italic gap-2 dark:text-white">
      <div className="w-full self-start flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-4xl">
            {modalData.product_serial}
          </span>
          <div
            className={`flex items-center gap-1 px-2 py-1 text-sm rounded-full
            ${warrantyStatusConfig[modalData.status]?.styles}`}
          >
            <Icon
              name={warrantyStatusConfig[modalData.status]?.icon}
              fill
              size={15}
            />
            <span>{warrantyStatusConfig[modalData.status]?.text}</span>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <span className="text-sm text-[#7E7775]">Descripción</span>
          <span>{modalData.description}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-[#7E7775]">Nombre del cliente</span>
          <span>{modalData.customer}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-[#7E7775]">Teléfono</span>
          <span>{modalData.phone}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-[#7E7775]">Ciudad</span>
          <span>{modalData.city_name}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-[#7E7775]">Dirección</span>
          <span>{modalData.address}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-[#7E7775]">Fecha de creación</span>
          <span>{modalData.date}</span>
        </div>
      </div>

      <ConfirmCancelButtons
        confirmText={
          loading ? (
            <Loader />
          ) : modalData.status === 2 ? (
            "Comenzar"
          ) : modalData.status === 3 ? (
            "Terminar"
          ) : modalData.status === 4 ? (
            "Editar"
          ) : (
            "Habilitar"
          )
        }
        confirmButtonOnClick={
          modalData.status === 4
            ? (e) => openInnerModal("edit", e)
            : () => handleStatusChange(onClose)
        }
        cancelButtonOnClick={onClose}
      />

      {innerType === "edit" && (
        <AddInnerModal
          isOpen={true}
          triggerRef={innerTrigger}
          title={"Editar garantía"}
          onClose={() => openInnerModal(null)}
        >
          <EditWarrantyModal
            selectedWarranty={modalData}
            onClose={() => openInnerModal(null)}
          />
        </AddInnerModal>
      )}
    </div>
  );
}
