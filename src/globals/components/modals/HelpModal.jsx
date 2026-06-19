// Hooks
import { useInnerModal } from "../../hooks/useInnerModal";
import { useSendSuggestion } from "../../hooks/useSendSuggestion";
// Componentes
import Loader from "../ui/Loader";
import ConfirmCancelButtons from "./ConfirmCancelButtons";
import ErrorModal from "./ErrorModal";
// Modales
import SuccessModal from "./SuccessModal";

export default function HelpModal({ onClose }) {
  const { form, loading, handleChange, handleSubmit } = useSendSuggestion();
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <form
      action={(e) => handleSubmit(e, openInnerModal)}
      className="flex flex-col items-center justify-center gap-4"
    >
      <span className="text-[#75777E] text-sm">
        Si te encontraste con algún error, necesitas ayuda con un registro o
        presentas un problema con la aplicación, puedes comunicarte con nosotros
        y te ayudaremos.
      </span>

      <div
        className="w-full pr-1 pl-2 pt-2 border shadow-sm text-black rounded-xl bg-[#fbf9fc]
        focus-within:shadow-[0_0_3px_2px_#e5e7eb]
        dark:bg-black dark:border-[#1e1e20cb] dark:focus-within:shadow-[0_0_3px_3px_#28282b]"
      >
        <textarea
          name="suggestion"
          value={form.suggestion}
          onChange={handleChange}
          className="w-full h-40 text-sm outline-none bg-[#fbf9fc]
          md:text-base
          placeholder:text-gray-800
          dark:bg-transparent dark:placeholder:text-[#7E8088] dark:text-[#e4e2e5]"
          placeholder="Escribe aquí tu problema o sugerencia"
        />
      </div>

      <ConfirmCancelButtons
        itemsPosition="end"
        confirmText={loading ? <Loader /> : "Enviar"}
        confirmImageDisplay={loading ? false : true}
        confirmImage={"send"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "success" && (
        <SuccessModal
          isOpen={true}
          triggerRef={innerTrigger}
          confirmTitle={"Sugerencia enviada con exito"}
          confirmText={
            "Gracias por compartir con nosotros está informacion, en breve nos comunicaremos contigo"
          }
          onClose={closeInnerModal}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          isOpen={true}
          triggerRef={innerTrigger}
          errorTitle={"No se pudo enviar tu sugerencia"}
          errorText={
            "Lo sentimos, no se pudo enviar tu sugerencia, intentalo nuevamente más tarde"
          }
          onClose={closeInnerModal}
        />
      )}
    </form>
  );
}
