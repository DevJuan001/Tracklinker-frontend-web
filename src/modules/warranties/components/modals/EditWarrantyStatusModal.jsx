// Hooks
import { warrantyStatusConfig } from "../../constants/warrantyStatus";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { useEditWarrantyStatus } from "../../hooks/useEditWarrantyStatus";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
// Modales
import DisableWarrantyModal from "./DisableWarrantyModal";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";

export default function EditWarrantyStatusModal({ warranty, onClose }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { loading, error, handleStatusChange } = useEditWarrantyStatus();

  return (
    <div className="flex flex-col gap-0.5">
      {Object.entries(warrantyStatusConfig)
        .filter(([id]) => {
          const numId = Number(id);
          const next = warranty.status + 1;

          if (warranty.status === 1) return numId === 2;

          return numId === next || numId === 1;
        })
        .map(([id, config]) => (
          <div
            id={`edit-warranty-status-${id}-option`}
            key={id}
            onClick={(e) => {
              if (id === "1") {
                openInnerModal("disable", e);
              } else {
                handleStatusChange(e, warranty, openInnerModal, onClose);
              }
            }}
            className={`${config.optionStyles} px-4 py-3.5 rounded-3xl cursor-pointer text-sm font-normal transition-all duration-200
            dark:hover:bg-[#333]`}
          >
            {loading ? (
              <Loader invert={true} />
            ) : (
              <span>{config.optionText}</span>
            )}
          </div>
        ))}

      {innerType === "disable" && (
        <AddInnerModal
          isOpen={true}
          title={"Deshabilitar garantía"}
          triggerRef={innerTrigger}
          onClose={closeInnerModal}
          location="anchored"
          growDirection={"top-center"}
        >
          <DisableWarrantyModal
            selectedWarranty={warranty}
            onClose={() => {
              closeInnerModal();
              onClose();
            }}
          />
        </AddInnerModal>
      )}

      {innerType === "error" && (
        <ErrorModal
          trigger={innerTrigger}
          isOpen={true}
          location="anchored"
          growDirection={"center"}
          onClose={closeInnerModal}
          errorTitle={"¡No se pudo cambiar el estado de la garantía!"}
          errorText={error}
        />
      )}
    </div>
  );
}
