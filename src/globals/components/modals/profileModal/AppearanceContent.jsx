import Icon from "../../ui/Icon";
import { useTheme } from "../../../hooks/useTheme";

export default function AppearanceContent() {
  const { setTheme } = useTheme();
  return (
    <section className="flex flex-col w-full pb-10 gap-7 animate-blurUp dark:text-white">
      {/* Opciones de apariencia */}
      <section className="w-full flex flex-col gap-2">
        <span className="font-medium text-sm pl-1">Apariencia</span>
        <section className="flex gap-3 w-full">
          {/* Sistema */}
          <button
            onClick={() => setTheme("system")}
            className={`w-32 flex flex-col items-start justify-between gap-1.5 py-2.5 pl-3 border rounded-xl
            focus-within:shadow-[0_0_3px_2px_#e5e7eb]
            dark:bg-[#2020226c] dark:border-[#202022] dark:focus-within:shadow-[0_0_3px_3px_#28282b]
            md:w-[135px]
            `}
          >
            <div className="flex items-center">
              <Icon
                fill
                name={"circle"}
                size={18}
                color={"#ffffff"}
                className="border rounded-full dark:border-none"
              />

              <Icon
                fill
                name={"circle"}
                size={20}
                color={"#000"}
                className={"rounded-3xl dark:border dark:border-gray-900"}
              />
            </div>
            <span className="font-medium text-xs md:text-sm">Sistema</span>
          </button>

          {/* Claro */}
          <button
            onClick={() => setTheme("light")}
            className={`w-32 flex flex-col items-start justify-between gap-2 py-2.5 pl-3 border rounded-xl
            focus-within:shadow-[0_0_3px_2px_#e5e7eb]
            dark:bg-[#2020226c] dark:border-[#202022]
            md:w-[135px]
            `}
          >
            <Icon
              fill
              name={"circle"}
              size={18}
              color={"#ffffff"}
              className="border rounded-full dark:border-none"
            />
            <span className="font-medium text-sm">Claro</span>
          </button>

          {/* Oscuro */}
          <button
            onClick={() => setTheme("dark")}
            className={`w-32 flex flex-col items-start justify-between gap-2 py-2.5 pl-3 pr-20 border rounded-xl
              dark:focus-within:shadow-[0_0_3px_3px_#28282b]
              dark:bg-[#2020226c] dark:border-[#202022]
              md:w-[135px]
              `}
          >
            <Icon
              fill
              name={"circle"}
              size={20}
              color={"#000"}
              className={"rounded-3xl dark:border dark:border-gray-900"}
            />

            <span className="font-medium text-sm">Oscuro</span>
          </button>
        </section>
      </section>

      <section className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-sm">Lenguaje</span>
          <span className="text-xs font-light">Español</span>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-black text-white dark:bg-[#2020226c]">
          <Icon name={"globe"} size={20} />

          <span className="text-sm font-medium">Cambiar</span>
        </button>
      </section>
    </section>
  );
}
