import Icon from "./Icon";

export default function CreateButton({
  icon,
  text,
  onClick,
  createButtonVisibility = true,
}) {
  return (
    <button
      className={`flex items-center px-5 py-2.5 gap-2 bg-black rounded-3xl transition duration-500 ${createButtonVisibility ? "block" : "hidden"}
      hover:shadow-lg hover:shadow-black/20
      dark:bg-white dark:hover:shadow-[0px_0px_32px_-11px_#ffffff]`}
      onClick={onClick}
    >
      <Icon
        name={icon ? icon : "add"}
        weight={600}
        className="invert dark:brightness-200 dark:invert-0"
      />
      <span
        data-flip-id="modal-title"
        className="hidden text-white font-medium dark:text-black lg:block"
      >
        {text}
      </span>
    </button>
  );
}
