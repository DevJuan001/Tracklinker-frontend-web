import Icon from "./Icon";

export default function DateField({
  spanText,
  inputRef,
  value,
  name,
  onClick,
  onChange,
  children,
}) {
  return (
    <div
      tabIndex={0}
      onClick={onClick}
      className="relative w-full h-16 flex px-4 rounded-2xl border outline-[#00000028] text-center cursor-pointer shadow-sm
    dark:border-[#1e1e20cb] text-sm dark:text-white focus:shadow-[0_0_2px_1px_#e5e7eb]"
    >
      <div className="min-w-full max-w-full flex items-center pt-1 pr-3">
        <div className="min-w-full max-w-28 flex flex-col items-start gap-0.5">
          <span className="text-xs text-[#7E7777]">{spanText}</span>
          <input
            className="outline-none cursor-pointer bg-transparent text-base "
            ref={inputRef}
            readOnly
            name={name}
            value={value}
            onChange={onChange}
          />
        </div>
        <Icon
          name={"calendar_today"}
          size={14}
          fill
          className="dark:text-[#7e8088]"
        />
      </div>
      {children}
    </div>
  );
}
