import Icon from "../../../../globals/components/ui/Icon";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";
import { categoryStatusConfig } from "../../../categories/constants/categoryStatusConfig";

export default function SubcategoriesItem({
  subcategory,
  editButtonOnClick,
  openModal,
  moreInfoOnClick,
}) {
  return (
    <li
      key={subcategory.subcategory_id}
      onClick={moreInfoOnClick}
      className="flex items-center justify-between p-5 bg-[#F5F3F6] rounded-lg transition duration-300 cursor-pointer
      hover:bg-[#96929231]
      dark:bg-[#101012] dark:hover:bg-[#17171a]"
    >
      {/* Datos de la Subcategoría */}
      <article>
        <address className="flex items-center gap-3 not-italic font-medium dark:text-white">
          <span className="text-xl">{subcategory.subcategory_name}</span>

          <div className="flex items-center gap-2">
            <Icon name={"folder_open"} size={24} />

            <span>{subcategory.category_name}</span>
          </div>
          <div
            className={`flex items-center px-2 py-1 gap-1 rounded-full text-xs border ${categoryStatusConfig[subcategory.subcategory_status]?.styles}`}
          >
            <Icon
              name={categoryStatusConfig[subcategory.subcategory_status]?.icon}
              fill={categoryStatusConfig[subcategory.subcategory_status]?.fill}
              size={14}
            />

            <span>
              {categoryStatusConfig[subcategory.subcategory_status]?.text}
            </span>
          </div>
        </address>
      </article>

      <ActionButtons
        editButtonId={`edit-subcategory-${subcategory.subcategory_id}-button`}
        deleteButtonId={`${categoryStatusConfig[subcategory.subcategory_status]?.modalType}-subcategory-${subcategory.subcategory_id}-button`}
        editButtonOnClick={editButtonOnClick}
        deleteButtonOnClick={(e) => {
          e.stopPropagation();
          openModal(
            subcategory,
            categoryStatusConfig[subcategory.subcategory_status]?.modalType,
            null,
            e.currentTarget,
          );
        }}
        visibilityIcon={
          categoryStatusConfig[subcategory.subcategory_status]?.visibilityIcon
        }
        moreInfoButtonOnClick={moreInfoOnClick}
      />
    </li>
  );
}
