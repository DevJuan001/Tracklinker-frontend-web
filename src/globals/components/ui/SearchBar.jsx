import Icon from "./Icon";

export default function SearchBar({ value, onChange }) {
  return (
    <div
      className="flex items-center pr-3 w-[40%] border border-[#a1a1a140] rounded-3xl
      lg:w-[20%]
      dark:border-[#34343a77]"
    >
      <input
        id="search-text"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar"
        className="w-full py-2.5 px-5 rounded-3xl outline-none
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
