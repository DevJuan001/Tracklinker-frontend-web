import Calendar from "../ui/Calendar";
import DateField from "../ui/DateField";
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
            onChange={(formatted) => {
              orderByStartDateOnChange({
                target: { name: "start_date", value: formatted },
              });
            }}
          />

          <DateField
            spanText={"Hasta:"}
            name={"end_date"}
            value={
              orderByFinishDateValue ? orderByFinishDateValue : "yyyy-mm-dd"
            }
            onChange={(formatted) => {
              orderByFinishDateOnChange({
                target: { name: "end_date", value: formatted },
              });
            }}
          />
        </div>
      </div>

      <section>{children}</section>

      {/* Botones de aplicar y cancelar */}
      <ConfirmCancelButtons
        confirmButtonOnClick={applyButtonOnClick}
        confirmText="Aplicar"
        cancelButtonOnClick={onClose}
      />
    </section>
  );
}
