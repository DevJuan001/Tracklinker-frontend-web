import Icon from "../ui/Icon";

export default function ModalHighSection({
  deleteButtonOnClick,
  deleteButtonIcon = "delete",
  closeButtonOnClick,
  icon,
  iconClassName = "dark:text-[#E4E2E5]",
  text,
  description,
}) {
  return (
    <div
      className="w-full min-h-56 flex justify-between items-center py-2 px-2 gap-2 bg-[#efedf0] border-2 border-[#EBE6E7] rounded-3xl
      dark:bg-[#101012] dark:border-[#202022]"
    >
      {deleteButtonOnClick && (
        <button
          type="button"
          onClick={deleteButtonOnClick}
          className="self-start flex items-center p-2.5 rounded-3xl bg-[#fbf9fc] border border-[#EBE6E7] transition-colors duration-200 group
          hover:bg-[#ff5b5b41]
          dark:bg-black dark:text-[#7E8088] dark:border-[#202022]"
        >
          <Icon
            name={deleteButtonIcon}
            size={20}
            className={"group-hover:text-red-700"}
          />
        </button>
      )}

      <div className="justify-self-center max-w-52 flex flex-col items-center gap-2">
        <Icon
          name={icon}
          size={60}
          fill
          className={iconClassName}
          data-shared-id="modal-icon"
        />

        <span
          className="max-w-52 font-semibold text-2xl text-wrap text-center overflow-hidden
          dark:text-[#E4E2E5]"
          data-shared-id="modal-title"
        >
          {text}
        </span>

        {description && (
          <span
            className="max-w-52 text-wrap text-[#75777E] font-dmsans
            dark:text-[#7E8088]"
          >
            {description}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={closeButtonOnClick}
        className="self-start flex items-center p-2.5 rounded-3xl bg-[#fbf9fc] border border-[#EBE6E7] transition-colors duration-200
        hover:bg-[#ffffff3d]
        dark:bg-black dark:text-[#7E8088] dark:hover:bg-[#101012] dark:border-[#202022]"
      >
        <Icon name={"close"} size={20} />
      </button>
    </div>
  );
}
