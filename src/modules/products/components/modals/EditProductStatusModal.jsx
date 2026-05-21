// Hooks
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Constantes
import { productStatusConfig } from "../../constants/productStatusConfig";
// Componentes
// Modales
import EnableProductModal from "./EnableProductModal";
import DisableProductModal from "./DisableProductModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";
import AddWarrantyModal from "../../../warranties/components/modals/AddWarrantyModal";

export default function EditProductStatusModal({ product, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();

  return (
    <div className="flex flex-col gap-0.5">
      {Object.entries(productStatusConfig)
        .filter(([id]) => {
          const numId = Number(id);
          if (numId === product.status) return false;
          if (product.status === 4 && numId === 2) return false;
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
          onClose={() => openInnerModal(null)}
        >
          <EnableProductModal
            product={product}
            onClose={() => {
              openInnerModal(null);
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
          onClose={() => openInnerModal(null)}
        >
          <DisableProductModal
            product={product}
            onClose={() => {
              openInnerModal(null);
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
          onClose={() => openInnerModal(null)}
        >
          <AddWarrantyModal
            product={product}
            onCloseModal={() => {
              openInnerModal(null);
              onClose();
            }}
          />
        </AddInnerModal>
      )}

      {innerType === "sell" && (
        <AddInnerModal
          isOpen={true}
          title={"Vender Producto"}
          location={"anchored"}
          triggerRef={innerTrigger}
          onClose={() => openInnerModal(null)}
        />
      )}
    </div>
  );
}
