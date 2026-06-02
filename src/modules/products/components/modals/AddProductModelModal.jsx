// Hooks
import { useCatalog } from "../../hooks/useCatalog";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { useCreateProductModel } from "../../hooks/useCreateProductModel";
// Components
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";

export default function AddProductModelModal({ triggerRef, isOpen, onClose }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { brands } = useCatalog();
  const { form, loading, error, fieldError, handleChange, handleSubmit } =
    useCreateProductModel();

  return (
    <AddInnerModal
      triggerRef={triggerRef}
      isOpen={isOpen}
      onClose={onClose}
      title={"Agregar modelo"}
    >
      <section className="w-full flex flex-col items-center gap-2.5">
        <SelectMenu
          searchable
          id={"brand-menu"}
          value={form.brand_id}
          name="brand_id"
          spanText={"Marca"}
          onChange={handleChange}
          options={brands.map((brand) => ({
            value: brand.id,
            label: brand.name,
          }))}
          className={fieldError("brand_id")}
        />

        <FormField
          id={"model-name"}
          name="model"
          value={form.model}
          labelText={"Modelo"}
          onChange={handleChange}
          placeholder={"Impresora a color"}
          className={fieldError("model")}
        />

        <FormField
          id={"description"}
          value={form.description}
          type="textarea"
          labelText={"Descripción"}
          name={"description"}
          onChange={handleChange}
          placeholder={"Impresora multicolor"}
          className={fieldError("description")}
        />

        <ConfirmCancelButtons
          confirmText={loading ? <Loader /> : "Crear"}
          confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        />

        {/* Modales internas */}
        {innerType === "success" && (
          <SuccessModal
            triggerRef={innerTrigger}
            isOpen={true}
            onClose={() => {
              closeInnerModal();
              onClose();
            }}
            confirmTitle={"Modelo creado correctamente"}
            confirmText={"Ya puedes volver, y utilizar este nuevo modelo"}
            confirmButtonText={"Volver"}
          />
        )}

        {innerType === "error" && (
          <ErrorModal
            triggerRef={innerTrigger}
            isOpen={true}
            onClose={() => closeInnerModal()}
            confirmButtonText={"Volver a intentarlo"}
            errorTitle={"!No se pudo crear el modelo!"}
            errorText={error}
          />
        )}
      </section>
    </AddInnerModal>
  );
}
