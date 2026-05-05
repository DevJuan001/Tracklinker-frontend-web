import Icon from "./Icon";

export default function CreateButton({
  icon,
  text,
  onClick,
  createButtonVisibility = true,
}) {
  return (
    <button
      className={`flex items-center px-5 py-5 gap-2 rounded-[40px] bg-black transition duration-500 ${createButtonVisibility ? "block" : "hidden"}
      lg:rounded-3xl lg:py-3
      hover:bg-black/90 hover:shadow-black/20
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
