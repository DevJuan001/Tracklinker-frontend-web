import Icon from "./Icon";
import { useTagInput } from "../../hooks/useTagInput";

export default function TagInput({
  value,
  labelText,
  id,
  type = "text",
  placeholder,
  onChange,
  name,
  autoComplete = "off",
  className,
  maxTags,
  allowDuplicates = false,
}) {
  const {
    tags,
    input,
    shake,
    inputRef,
    removeTag,
    handleKeyDown,
    handlePaste,
    handleBlur,
    handleInputChange,
    focusInput,
  } = useTagInput({ value, name, onChange, allowDuplicates, maxTags });

  return (
    <div
      onClick={focusInput}
      className={`relative min-h-[66px] max-h-[350px] flex flex-wrap w-full border pl-4 pb-1 rounded-2xl bg-[#FBF9FC] overflow-hidden cursor-text
      focus-within:shadow-[0_0_3px_2px_#e5e7eb]
      dark:bg-black dark:border-[#1e1e20cb] dark:focus-within:shadow-[0_0_3px_3px_#28282b]
      ${
        shake
          ? "shadow-[0_0_2.5px_1px_#f87171] dark:shadow-[0_0_4px_1.5px_#7f1d1d] animate-shake"
          : className
            ? className
            : "shadow-sm"
      }
      `}
    >
      {labelText && (
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
      )}

      <div className="flex flex-wrap gap-1 w-full mt-7">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="flex items-center gap-1.5 pl-2.5 pr-1 py-1 border text-sm rounded-xl"
          >
            {tag}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTag(i);
              }}
              className="flex items-center rounded-full p-1
              hover:bg-[#49454f21] dark:hover:bg-[#28282bbd]"
            >
              <Icon name={"close"} color={"#000"} size={15} />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          required
          placeholder={tags.length === 0 ? placeholder : ""}
          id={id}
          type={type}
          name={name}
          value={input}
          onBlur={handleBlur}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          autoComplete={autoComplete}
          className={`
          w-auto outline-none
          bg-transparent rounded-xl
          transition-all duration-200
          dark:text-[#E4E2E5] dark:placeholder:text-[#b4aab4]
        `}
        />
      </div>
    </div>
  );
}
