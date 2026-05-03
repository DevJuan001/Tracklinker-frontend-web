import ActionButtons from "../../../../globals/components/ui/ActionButtons";
import Icon from "../../../../globals/components/ui/Icon";

export default function SupplierActions({
  editButtonOnClick,
  deleteButtonOnClick,
  moreInfoOnClick,
}) {
  return (
    // Botones para interactuar
    <nav className="flex gap-4">
      <ActionButtons
        editButtonOnClick={editButtonOnClick}
        deleteButtonOnClick={deleteButtonOnClick}
      >
        {/* Botón de más información del usuario */}
        <button
          onClick={moreInfoOnClick}
          className="flex items-center transition-colors duration-300 rounded-xl p-1.5 bg-[#F5F3F6]
         hover:bg-[#969292a8]"
        >
          <Icon name={"arrow_outward"} />
        </button>
      </ActionButtons>
    </nav>
  );
}
