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
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="min-w-12 min-h-12 flex items-center justify-center bg-[#49454f14] rounded-full">
              <Icon name={"folder_open"} fill size={30} />
            </div>
            <span className="text-3xl leading-none font-semibold">
              {category.name}
            </span>
          </div>
          <div
            className={`flex gap-1.5 px-2 py-1.5 rounded-full border
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

        <div className="flex flex-col mt-2">
          <span className="text-sm text-[#7e777ed0] dark:text-[#b4aab4]">
            Descripción
          </span>
          <span className="flex items-center font-medium">
            {category.description}
          </span>
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
