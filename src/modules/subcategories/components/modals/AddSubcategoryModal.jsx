// Hooks
import { useActiveCategories } from "../../hooks/useActiveCategories";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
import { useCreateSubcategory } from "../../hooks/useCreateSubcategory";
// Componentes
import Loader from "../../../../globals/components/ui/Loader";
import FormField from "../../../../globals/components/ui/FormField";
import SelectMenu from "../../../../globals/components/modals/SelectMenu";
import ConfirmCancelButtons from "../../../../globals/components/modals/ConfirmCancelButtons";
// Modales
import ErrorModal from "../../../../globals/components/modals/ErrorModal";
import SuccessModal from "../../../../globals/components/modals/SuccessModal";
import AddInnerModal from "../../../../globals/components/modals/AddInnerModal";
import AddCategoryModal from "../../../categories/components/modals/AddCategoryModal";

export default function AddSubcategoryModal({ onClose }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { categories } = useActiveCategories();
  const { form, loading, error, fieldError, handleSubmit, handleChange } =
    useCreateSubcategory();

  return (
    <form
      action={(e) => handleSubmit(e, openInnerModal)}
      className="w-full flex flex-col items-center gap-2"
    >
      {/* Menú para elegir la categoria a la cúal pertenecera la subcategoria */}
      <SelectMenu
        searchable
        seeAddButton
        id={"categories-menu"}
        value={form.category_id}
        name={"category_id"}
        spanText={"Categoria"}
        onChange={handleChange}
        addIconFunction={(e) => openInnerModal("addCategory", e)}
        options={categories.map((category) => ({
          value: category.category_id,
          label: category.category_name,
        }))}
        className={fieldError("category_id")}
      />

      <FormField
        id={"subcategory-name"}
        labelText={"Nombre de la Subcategoria"}
        placeholder={"Computadores"}
        name={"subcategory_name"}
        value={form.subcategory_name}
        autoComplete="off"
        onChange={handleChange}
        className={fieldError("subcategory_name")}
      />

      {/* Botones */}
      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Crear"}
        cancelText={"Cancelar"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "addCategory" && (
        <AddInnerModal
          isOpen={true}
          onClose={closeInnerModal}
          title={"Crear categoría"}
          triggerRef={innerTrigger}
        >
          <AddCategoryModal onClose={closeInnerModal} />
        </AddInnerModal>
      )}

      {/* Modales Internas */}
      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          confirmTitle={"Subcategoria creada con éxito!"}
          confirmText={
            "Se ha creado correctamente la subcategoria, toca el botón de volver para verla o usarla"
          }
          confirmButtonText={"Volver a la pagina"}
          onClose={() => {
            closeInnerModal();
            onClose();
          }}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="¡No se pudo crear la subcategoria!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={closeInnerModal}
        />
      )}
    </form>
  );
}
