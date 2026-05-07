// Hooks
import { useCities } from "../../../../globals/hooks/useCities";
import { useCreateWarranty } from "../../hooks/useCreateWarranty";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";

export default function AddWarrantyModal({ product, onCloseModal }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { form, loading, error, handleChange, handleSubmit } =
    useCreateWarranty(product);
  const { cities } = useCities();

  return (
    <section className="flex flex-col items-center gap-2">
      <FormField
        id={"serial"}
        placeholder={"QTYC99999"}
        name={"product_serial"}
        labelText={"Serial"}
        value={form.product_serial}
        onChange={handleChange}
      />

      <FormField
        id={"customer"}
        name={"customer"}
        labelText={"Nombre del Cliente"}
        value={form.customer}
        onChange={handleChange}
        placeholder="Miguel Arnulfo Pérez"
      />

      <FormField
        id={"phone"}
        name={"phone"}
        labelText={"Teléfono"}
        value={form.phone}
        onChange={handleChange}
        placeholder="+57 300 123 XXXX"
      />

      <FormField
        id={"address"}
        name={"address"}
        labelText={"Dirección"}
        value={form.address}
        onChange={handleChange}
        placeholder="kr 45 # 67-XX"
      />

      <SelectMenu
        searchable
        name={"city"}
        spanText={"Ciudad"}
        value={form.city}
        onChange={handleChange}
        options={cities.map((city) => ({
          value: city.id,
          label: city.name,
        }))}
        placeholder="Bogotá"
      />

      <div
        tabIndex={0}
        className="relative flex w-full border pr-1 rounded-xl
        focus-within:shadow-[0_0_3px_2px_#e5e7eb]
        dark:border-[#28282b] dark:focus:shadow-[0_0_4px_2px_#ffffff33]
        "
      >
        <textarea
          required
          placeholder={
            "Descripción detallada del estado del producto y que se debería modificar del producto"
          }
          name={"description"}
          onChange={handleChange}
          value={form.description}
          id={"description"}
          className="
          w-full h-40 px-4 pt-7 pb-2 outline-none
          bg-transparent rounded-xl
          transition-all duration-200
          autofill:bg-white autofill:shadow-[inset_0_0_0px_1000px_white]
          dark:text-[#E4E2E5]
          "
        />
        <label
          htmlFor={"description"}
          className="
          absolute left-3.5 top-5 px-0.5
          -translate-y-1/2
          text-xs text-[#7E777E]
          pointer-events-none
          transition-all duration-200
          bg-white dark:bg-black dark:text-[#b4aab4]
          "
        >
          Descripción
        </label>
      </div>

      <FormField
        id={"link_attachments"}
        name={"link_attachments"}
        labelText={"Link de adjuntos"}
        value={form.link_attachments}
        onChange={handleChange}
        placeholder="https://drive.google.com/ejemplo"
      />

      <ConfirmCancelButtons
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onCloseModal}
        confirmText={loading ? <Loader /> : "Crear"}
      />

      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          location="anchored"
          growDirection={"top-right"}
          isOpen={true}
          confirmTitle="¡Garantía registrada con éxito!"
          confirmText="La garantía se ha guardado correctamente."
          confirmButtonText="Volver"
          onClose={() => {
            openInnerModal(null);
            onCloseModal();
          }}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          location="anchored"
          growDirection={"top-center"}
          isOpen={true}
          errorTitle="No se pudo registrar la garantía"
          errorText={error}
          confirmButtonText="Volver"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
