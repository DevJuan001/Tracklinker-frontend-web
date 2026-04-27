export default function DateInput({ spanText, id, name, onChange }) {
  return (
    <section className="flex flex-col gap-1">
      <span className="text-sm dark:text-white">{spanText}</span>
      <input
        onChange={onChange}
        name={name}
        id={id}
        type="date"
        className="p-3 rounded-lg border text-sm outline-none
            dark:bg-[#2020226c] dark:border-[#101012] dark:text-white"
      />
    </section>
  );
}
