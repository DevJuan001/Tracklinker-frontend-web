export default function InputWithDataList({ spanText, id, name, onChange, options }) {
    return(
        <section className="flex flex-col gap-1">
            <span className="text-sm dark:text-white">{spanText}</span>
            <input
                onChange={onChange}
                name={name}
                id={id}
                list={`${id}-options`}
                className="p-3 rounded-lg border text-sm outline-none
                dark:bg-[#2020226c] dark:border-[#101012] dark:text-white"
            />
            <datalist id={`${id}-options`}>
                {options.map((option, index) => (
                    <option key={index} value={option} />
                ))}
            </datalist>
        </section>
    )
}