import useSendSuggestion from "../../hooks/useSendSuggestion";
import Loader from "../ui/Loader";
import TextArea from "../ui/TextArea";
import ConfirmCancelButtons from "./ConfirmCancelButtons";

export default function HelpModal({ onClose }) {
  const { form, loading, handleChange, handleSubmit } = useSendSuggestion();

  return (
    <section className="flex flex-col items-center justify-center gap-4">
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
          value={form.sugggestion}
          onChange={handleChange}
          className="w-full h-40 text-sm outline-none bg-[#fbf9fc]
          md:text-base
          placeholder:text-gray-800
          dark:bg-transparent dark:placeholder:text-[#7E8088]"
          placeholder="Escribe aquí tu problema o sugerencia"
        />
      </div>

      <ConfirmCancelButtons
        itemsPosition="end"
        confirmText={loading ? <Loader /> : "Enviar"}
        confirmImageDisplay={loading ? false : true}
        confirmImage={"send"}
        confirmButtonOnClick={(e) => handleSubmit(e)}
        cancelButtonOnClick={onClose}
      />
    </section>
  );
}
