export default function TextArea({
  value,
  labelText,
  id,
  placeholder,
  onChange,
  name,
  children,
}) {
  return (
    <div
      tabIndex={0}
      className="relative flex w-full border pr-1 pb-1 rounded-xl shadow-sm
      focus-within:shadow-[0_0_3px_2px_#e5e7eb]
      dark:border-[#1e1e20cb] dark:focus-within:shadow-[0_0_4px_3px_#28282b]
      "
    >
      <textarea
        required
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        id={id}
        className="
          w-full h-28 px-4 pt-7 pb-2 outline-none
          bg-transparent rounded-xl
          transition-all duration-200
          autofill:bg-white autofill:shadow-[inset_0_0_0px_1000px_white]
          dark:text-[#E4E2E5]
        "
      />
      <label
        htmlFor={id}
        className="
        absolute left-3.5 top-5 px-0.5
        -translate-y-1/2
        text-xs text-[#7E777E]
        pointer-events-none
        transition-all duration-200
        bg-[#FBF9FC] dark:bg-black dark:text-[#b4aab4]
        "
      >
        {labelText}
      </label>
      {children}
    </div>
  );
}
