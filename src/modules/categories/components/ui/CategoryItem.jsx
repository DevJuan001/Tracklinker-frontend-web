import { actionsIcons } from "../../../../assets/icons/actionsIcons";
import { categoryStatusConfig } from "../../constants/categoryStatusConfig";
import ActionButtons from "../../../../globals/components/ui/ActionButtons";
import Icon from "../../../../globals/components/ui/Icon";

export default function CategoryItem({
  category,
  openModal,
  editButtonOnClick,
  moreInfoOnClick,
}) {
  return (
    <li
      className="flex items-center justify-between p-5 bg-[#F5F3F6] rounded-lg transition duration-300 cursor-pointer
      hover:bg-[#9692923b]
      dark:bg-[#0f0f11] dark:hover:bg-[#212125]"
      onClick={moreInfoOnClick}
    >
      {/* Datos de la Categoría */}
      <article className="flex gap-3">
        <div className="flex font-medium dark:text-white">
          <p className="text-xl">{category.name}</p>
        </div>
        <div
          className={`flex items-center px-2 py-0.5 gap-1 rounded-full text-xs border ${categoryStatusConfig[category.status]?.styles}`}
        >
          <Icon
            name={categoryStatusConfig[category.status]?.icon}
            fill={categoryStatusConfig[category.status]?.fill}
            size={14}
          />
          <span>{categoryStatusConfig[category.status]?.text}</span>
        </div>
      </article>

      <ActionButtons
        editButtonOnClick={editButtonOnClick}
        deleteButtonOnClick={(e) => {
          e.stopPropagation();
          openModal(
            category,
            categoryStatusConfig[category.status]?.modalType,
            null,
            e.currentTarget,
          );
        }}
        visibilityIcon={categoryStatusConfig[category.status]?.visibilityIcon}
        moreInfoOnClick={moreInfoOnClick}
      >
        {/* Botón de más información del usuario */}
        <button onClick={moreInfoOnClick}>
          <img
            src={actionsIcons.moreInfoIcon}
            alt=""
            className="transition-all duration-300 hover:scale-125"
          />
        </button>
      </ActionButtons>
    </li>
  );
}
