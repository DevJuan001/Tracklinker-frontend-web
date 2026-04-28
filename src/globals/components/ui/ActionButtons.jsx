import Icon from "./Icon";

export default function ActionButtons({
  children,
  editButtonOnClick,
  deleteButtonVisible = true,
  visibilityIcon = true,
  deleteButtonOnClick,
}) {
  return (
    <section className="flex items-center justify-center gap-5 dark:invert">
      {children}
      <button
        onClick={editButtonOnClick}
        className="flex items-center transition-colors duration-300 rounded-xl p-1.5 hover:bg-[#969292a8]"
      >
        <Icon name={"edit"} />
      </button>
      <button
        onClick={deleteButtonOnClick}
        className={`${deleteButtonVisible ? "" : "hidden"}
        flex items-centertransition-colors duration-300 rounded-xl p-1.5 hover:bg-[#969292a8]`}
      >
        <Icon name={`${visibilityIcon ? "visibility" : "visibility_off"}`} />
      </button>
    </section>
  );
}
