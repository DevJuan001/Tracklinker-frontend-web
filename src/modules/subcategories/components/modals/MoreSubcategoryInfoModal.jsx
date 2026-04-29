// Hooks
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Constants
import { categoryStatusConfig } from "../../../categories/constants/categoryStatusConfig";
// Components
import Icon from "../../../../globals/components/ui/Icon";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import EditSubcategoryInfoModal from "./EditSubcategoryModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";

export default function MoreSubcategoryInfoModal({ subcategory, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();

  return (
    <section className="flex flex-col justify-center items-center dark:text-white">
      <div className="w-full self-start flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F5F3F6]">
              <Icon name={"folder_copy"} fill size={28} />
            </div>
            <span className="text-4xl leading-none font-semibold">
              {subcategory.subcategory_name}
            </span>
          </div>
          <div
            className={`flex gap-1.5 pl-2 py-1.5 rounded-full border
            ${categoryStatusConfig[subcategory.subcategory_status]?.styles}`}
          >
            <Icon
              name={categoryStatusConfig[subcategory.subcategory_status]?.icon}
              fill={categoryStatusConfig[subcategory.subcategory_status]?.fill}
              size={16}
            />
            <span className="text-xs font-medium">
              {categoryStatusConfig[subcategory.subcategory_status]?.text}
            </span>
          </div>
        </div>
        <div className="flex flex-col mt-3">
          <span className="text-sm text-[#7e777ed0] dark:text-[#b4aab4]">
            Categoría
          </span>
          <span className="font-medium">{subcategory.category_name}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-[#7e777ed0] dark:text-[#b4aab4]">
            Fecha de creación
          </span>
          <span className="flex items-center font-medium">
            {subcategory.subcategory_date}
          </span>
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
          triggerRef={innerTrigger}
          onClose={() => openInnerModal(null)}
          title={"Editar subcategoría"}
        >
          <EditSubcategoryInfoModal
            subcategory={subcategory}
            onClose={() => openInnerModal(null)}
          />
        </AddInnerModal>
      )}
    </section>
  );
}
