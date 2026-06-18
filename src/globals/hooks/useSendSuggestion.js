import { useState } from "react";
import { sendSuggestionService } from "../services/sendSuggestionService";
import { getModalTrigger } from "../../utils/getModalTrigger";

export function useSendSuggestion() {
  const [form, setForm] = useState({
    suggestion: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    setLoading(true);

    const triggerButton = getModalTrigger(e);

    try {
      const response = await sendSuggestionService(form);

      if (response.success) {
        openInnerModal("success", triggerButton);
      } else {
        openInnerModal("error", triggerButton);
      }
    } catch (err) {
      openInnerModal("error", triggerButton);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleChange, handleSubmit };
}
