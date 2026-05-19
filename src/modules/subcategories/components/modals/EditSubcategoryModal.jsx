// Hooks
import { useActiveCategories } from "../../hooks/useActiveCategories";
import { useEditSubcategory } from "../../hooks/useEditSubcategory";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";

export default function EditSubcategoryInfoModal({ subcategory, onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { categories } = useActiveCategories();
  const { form, loading, error, fieldError, handleChange, handleSubmit } =
    useEditSubcategory(subcategory);

  return (
    <section className="w-full flex flex-col items-center gap-2">
      {/* Menú para elegir la categoria a la cúal pertenecera la subcategoria */}
      <SelectMenu
        searchable
        value={form.category_id}
        id={"category_id"}
        name={"category_id"}
        spanText={"Categoria"}
        onChange={handleChange}
        options={categories.map((category) => ({
          value: category.category_id,
          label: category.category_name,
        }))}
        className={fieldError("category_id")}
      />
      <FormField
        id={"name"}
        name={"subcategory_name"}
        labelText={"Nombre"}
        value={form.subcategory_name}
        onChange={handleChange}
        className={fieldError("subcategory_name")}
      />

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Editar"}
        cancelText={"Cancelar"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {/* Modales Internas */}
      {innerType === "success" && (
        <SuccessModal
          location="anchored"
          growDirection={"top-right"}
          triggerRef={innerTrigger}
          isOpen={true}
          confirmTitle={"Subcategoria editada con éxito!"}
          confirmText={
            "Se ha editado correctamente la subcategoria, toca el botón de volver para verla o usarla"
          }
          confirmButtonText={"Volver a la pagina"}
          onClose={() => {
            openInnerModal(null);
            onClose();
          }}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          location="anchored"
          growDirection={"top-center"}
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="¡No se pudo editar la subcategoria!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
