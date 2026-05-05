import Icon from "./Icon";

export default function ActionButtons({
  children,
  editButtonOnClick,
  deleteButtonVisible = true,
  visibilityIcon = true,
  deleteButtonOnClick,
  backgroundColor = "#F5F3F6",
}) {
  return (
    <section className="flex items-center justify-center gap-3 dark:invert">
      {children}
      <button
        onClick={editButtonOnClick}
        className={`flex items-center transition-colors duration-300 rounded-xl p-1.5 bg-[${backgroundColor}] hover:bg-[#969292a8]`}
      >
        <Icon name={"edit"} className={"dark:invert"} />
      </button>
      <button
        onClick={deleteButtonOnClick}
        className={`${deleteButtonVisible ? "" : "hidden"}
        flex items-center transition-colors duration-300 rounded-xl p-1.5 bg-[${backgroundColor}] hover:bg-[#969292a8]`}
      >
        <Icon name={`${visibilityIcon ? "visibility" : "visibility_off"}`} />
      </button>
    </section>
  );
}
