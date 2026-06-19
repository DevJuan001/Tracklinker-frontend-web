import Icon from "./Icon";

export default function SearchBar({ value, onChange }) {
  return (
    <div
      className="flex items-center px-5 w-fit border border-[#a1a1a140] rounded-3xl
      md:w-[40%] md:pr-3 md:px-0
      lg:w-[30%]
      2xl:w-[20%]
      dark:border-[#34343a77]"
    >
      <input
        id="search-text"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar"
        className="hidden w-full py-2.5 px-5 rounded-3xl outline-none
        md:inline-block
        placeholder:text-[14px] placeholder:text-gray-400
        dark:bg-black dark:placeholder:text-[#b4aab49f] dark:text-white"
      />

      <Icon
        name={"search"}
        className="dark:brightness-200"
        color={"#7E80889f"}
      />
    </div>
  );
}
