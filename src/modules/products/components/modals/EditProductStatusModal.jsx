// Hooks
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { useCurrentUser } from "../../../../globals/hooks/useCurrentUser";
// Constantes
import { productStatusConfig } from "../../constants/productStatusConfig";
// Modales
import EnableProductModal from "./EnableProductModal";
import DisableProductModal from "./DisableProductModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";
import AddWarrantyModal from "../../../warranties/components/modals/AddWarrantyModal";
import AddOutputOrderModal from "../../../output-orders/components/modals/AddOutputOrderModal";

export default function EditProductStatusModal({ product, onClose }) {
  const { hasRole } = useCurrentUser();
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <div className="flex flex-col gap-0.5">
      {Object.entries(productStatusConfig)
        .filter(([id, config]) => {
          const numId = Number(id);
          if (numId === product.status) return false;
          if (product.status === 4 && numId === 2) return false;
          if (!hasRole(config.roles)) return false;

          return true;
        })
        .map(([id, config]) => (
          <div
            key={id}
            onClick={(e) => {
              openInnerModal(config.modalType, e);
            }}
            className={`${config.optionStyles} px-4 py-3.5 rounded-3xl cursor-pointer text-sm font-normal transition-all duration-200`}
          >
            <span>{config.optionText}</span>
          </div>
        ))}

      {innerType === "enable" && (
        <AddInnerModal
          isOpen={true}
          title={"Habilitar Producto"}
          location={"anchored"}
          triggerRef={innerTrigger}
          onClose={closeInnerModal}
        >
          <EnableProductModal
            product={product}
            onClose={() => {
              closeInnerModal();
              onClose();
            }}
          />
        </AddInnerModal>
      )}

      {innerType === "disable" && (
        <AddInnerModal
          isOpen={true}
          title={"Deshabilitar Producto"}
          location={"anchored"}
          triggerRef={innerTrigger}
          onClose={closeInnerModal}
        >
          <DisableProductModal
            product={product}
            onClose={() => {
              closeInnerModal();
              onClose();
            }}
          />
        </AddInnerModal>
      )}

      {innerType === "addWarranty" && (
        <AddInnerModal
          isOpen={true}
          title={"Agregar Garantía"}
          location={"center"}
          triggerRef={innerTrigger}
          onClose={closeInnerModal}
        >
          <AddWarrantyModal
            product={product}
            onCloseModal={() => {
              closeInnerModal();
              onClose();
            }}
          />
        </AddInnerModal>
      )}

      {innerType === "sell" && (
        <AddInnerModal
          isOpen={true}
          title={"Vender Producto"}
          location={"center"}
          triggerRef={innerTrigger}
          onClose={() => {
            closeInnerModal();
            onClose();
          }}
        >
          <AddOutputOrderModal
            serial={product?.product_serial}
            onClose={() => {
              closeInnerModal();
              onClose();
            }}
          />
        </AddInnerModal>
      )}
    </div>
  );
}
