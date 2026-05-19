import Calendar from "../ui/Calendar";
import DateField from "../ui/DateField";
import Icon from "../ui/Icon";
import ConfirmCancelButtons from "./ConfirmCancelButtons";

export default function FilterModal({
  applyButtonOnClick,
  orderByStartDateOnChange,
  orderByStartDateValue,
  orderByFinishDateOnChange,
  orderByFinishDateValue,
  onClose,
  children,
  fieldName = "Creación",
  seeCleanFiltersButton = false,
  cleanFiltersOnClick,
}) {
  return (
    <section className="w-full flex flex-col gap-2 font-dmsans">
      <div className="flex flex-col gap-1">
        {/* Inputs para seleccionar las fechas */}
        <span className="text-sm dark:text-white">Fecha de {fieldName}</span>
        <div className="max-w-full flex gap-2">
          <DateField
            spanText={"Desde:"}
            name={"start_date"}
            value={orderByStartDateValue ? orderByStartDateValue : "yyyy-mm-dd"}
            onChange={orderByStartDateOnChange}
          />

          <DateField
            spanText={"Hasta:"}
            name={"end_date"}
            value={
              orderByFinishDateValue ? orderByFinishDateValue : "yyyy-mm-dd"
            }
            onChange={orderByFinishDateOnChange}
          />
        </div>
      </div>

      <section>{children}</section>

      <div className="flex items-end justify-between">
        {/* Botones de aplicar y cancelar */}
        <ConfirmCancelButtons
          confirmButtonOnClick={applyButtonOnClick}
          confirmText="Aplicar"
          cancelButtonOnClick={onClose}
        />

        <button
          onClick={cleanFiltersOnClick}
          className={`${seeCleanFiltersButton ? "" : "hidden"} h-11 flex items-center px-3 py-2.5 gap-1 text-[#c0392b] rounded-2xl
            hover:bg-red-100 transition-colors duration-200
            dark:hover:bg-[#450a0a96]
            `}
        >
          <Icon name={"delete"} size={20} />
          <span className="text-sm">Limpiar filtros</span>
        </button>
      </div>
    </section>
  );
}
