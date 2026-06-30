import { useEffect } from "react";
import Icon from "./Icon";

export default function Toast({
  isOpen,
  onClose,
  icon,
  iconLightColor = "white",
  iconDarkColor = "black",
  iconLightBackgroundColor = "gray-900/40",
  iconDarkBackgroundColor = "gray-850",
  text,
  textLightColor = "white",
  textDarkColor = "black",
  description,
  duration = 3000,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [isOpen, duration, onClose]);

  return (
    isOpen && (
      <div
        className="fixed inset-0 z-10 flex items-start justify-center p-5 animate-toastIn pointer-events-none
        dark:text-white"
      >
        <div
          className="w-[360px] relative flex flex-col items-center pointer-events-auto group animate-toastIn
          hover:cursor-pointer"
        >
          {/* Toast */}
          <div
            className="relative w-fit flex items-center gap-2 p-2.5 pr-4 rounded-[20px] bg-[#1a1a1a] transition-[border-radius] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:rounded-b-none
            dark:bg-white"
          >
            <div
              className={`flex items-center justify-center p-0.5 ${iconLightBackgroundColor} rounded-3xl transition-all duration-200
              group-hover:scale-90 group-hover:translate-x-2
              ${iconDarkBackgroundColor}`}
            >
              <Icon
                name={icon}
                className={`${iconLightColor}
                ${iconDarkColor ? `${iconDarkColor}` : ""}`}
                size={18}
              />
            </div>

            <span
              className={`font-medium text-sm ${textLightColor} transition-all duration-200
              group-hover:scale-90
              ${textDarkColor}`}
            >
              {text}
            </span>
          </div>

          {description && (
            <div
              className="flex flex-col origin-top max-h-0 p-0 opacity-0 -translate-y-1 scale-y-90
              rounded-t-[20px] rounded-b-2xl bg-[#1a1a1a] text-[#ffffff80] overflow-hidden
              transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
              group-hover:max-h-96 group-hover:p-5
              group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-y-100
              dark:bg-white dark:text-[#75777E]"
            >
              <span className="text-sm">{description}</span>
            </div>
          )}
        </div>
      </div>
    )
  );
}
