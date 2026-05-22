import Icon from "./Icon";

export default function ActionButtons({
  children,
  editButtonOnClick,
  deleteButtonVisible = true,
  visibilityIcon = true,
  deleteButtonOnClick,
  backgroundColor = "#F5F3F6",
  moreInfoButtonOnClick,
  moreInfoButtonVisible = true,
  editButtonVisible = true,
}) {
  return (
    <section className="flex items-center justify-center gap-3 dark:invert">
      {children}

      {moreInfoButtonVisible && (
        <button
          onClick={moreInfoButtonOnClick}
          className="flex items-center transition-colors duration-300 rounded-xl p-1.5 bg-[${backgroundColor}] hover:bg-[#969292a8]"
        >
          <Icon name={"arrow_outward"} />
        </button>
      )}

      {editButtonVisible && (
        <button
          onClick={editButtonOnClick}
          className={`flex items-center transition-colors duration-300 rounded-xl p-1.5 bg-[${backgroundColor}] hover:bg-[#969292a8]`}
        >
          <Icon name={"edit"} />
        </button>
      )}

      {deleteButtonVisible && (
        <button
          onClick={deleteButtonOnClick}
          className="flex items-center transition-colors duration-300 rounded-xl p-1.5 bg-[${backgroundColor}] hover:bg-[#969292a8]"
        >
          <Icon name={`${visibilityIcon ? "visibility" : "visibility_off"}`} />
        </button>
      )}
    </section>
  );
}
