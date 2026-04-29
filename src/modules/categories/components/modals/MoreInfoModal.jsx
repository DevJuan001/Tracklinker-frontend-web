// Hooks
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Constants
import { categoryStatusConfig } from "../../constants/categoryStatusConfig";
// Components
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
import Icon from "../../../../globals/components/ui/Icon";
// Modals
import EditCategoryInfoModal from "./EditCategoryInfoModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";

export default function MoreInfoCategoryModal({ category, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();

  return (
    <section className="flex flex-col justify-center items-center dark:text-white">
      <div className="w-full self-start flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-4xl leading-none font-semibold">
            {category.name}
          </span>
          <div
            className={`flex gap-1.5 pl-2 py-1.5 rounded-full border
                ${categoryStatusConfig[category.status]?.styles}`}
          >
            <Icon
              name={categoryStatusConfig[category.status]?.icon}
              fill={categoryStatusConfig[category.status]?.fill}
              size={14}
            />
            <span className="text-xs font-medium">
              {categoryStatusConfig[category.status]?.text}
            </span>
          </div>
        </div>
        <div className="flex flex-col mt-3">
          <span className="text-sm text-[#7e777ed0] dark:text-[#b4aab4]">
            Categoría
          </span>
          <span className="font-medium">{category.name}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-[#7e777ed0] dark:text-[#b4aab4]">
            Fecha de creación
          </span>
          <span className="flex items-center font-medium">{category.date}</span>
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
          <EditCategoryInfoModal
            category={category}
            onClose={() => openInnerModal(null)}
          />
        </AddInnerModal>
      )}
    </section>
  );
}
