import { useAvatar } from "../../hooks/useAvatar";

export default function Avatar({ user, size = 50 }) {
  const { initials } = useAvatar(user);

  return (
    <div
      style={{ minWidth: size, minHeight: size }}
      className="flex justify-center items-center rounded-full bg-[#49454f14]
      dark:bg-[#28282bbd]"
    >
      <span
        className={`font-semibold 
        ${size >= 40 ? "text-xl" : size <= 30 ? "text-xs" : "text-base"}
        dark:text-white`}
      >
        {initials}
      </span>
    </div>
  );
}
