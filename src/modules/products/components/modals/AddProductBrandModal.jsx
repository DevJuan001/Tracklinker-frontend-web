// Hooks
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { useCreateProductBrand } from "../../hooks/useCreateProductBrand";
// Components
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";

export default function AddProductBrandModal({ triggerRef, isOpen, onClose }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { form, loading, error, fieldError, handleChange, handleSubmit } =
    useCreateProductBrand();

  return (
    <AddInnerModal
      triggerRef={triggerRef}
      isOpen={isOpen}
      onClose={onClose}
      title={"Crear Marca"}
    >
      <form
        action={(e) => handleSubmit(e, openInnerModal)}
        className="w-full flex flex-col items-center gap-2.5"
      >
        <FormField
          id={"name"}
          name={"name"}
          labelText={"Nombre de la marca"}
          placeholder={"Asus"}
          value={form.name}
          onChange={handleChange}
          className={fieldError("name")}
        />

        <ConfirmCancelButtons
          confirmText={loading ? <Loader /> : "Crear"}
          confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
          cancelButtonOnClick={() => {
            closeInnerModal();
            onClose();
          }}
        />
      </form>

      {/* Modales internas */}
      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={() => {
            closeInnerModal();
            onClose();
          }}
          confirmTitle={"Marca creada correctamente"}
          confirmText={
            "La marca ha sido creada con exito, ya puedes volver y usarla"
          }
          confirmButtonText={"Volver"}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          onClose={closeInnerModal}
          confirmButtonText={"Volver a intentarlo"}
          errorTitle={"!No se pudo crear la marca!"}
          errorText={error}
        />
      )}
    </AddInnerModal>
  );
}
