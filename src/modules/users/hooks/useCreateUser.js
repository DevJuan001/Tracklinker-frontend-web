import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/createUserService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";
import { getModalTrigger } from "../../../utils/getModalTrigger";

export function useCreateUser() {
  const [form, setForm] = useState({
    rol_id: "",
    name: "",
    first_surname: "",
    second_surname: "",
    address: "",
    city: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { validate, fieldError, clearError } = useFormValidation();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  }

  // Función que pasa los parametros al service y valida la respuesta
  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    const isValid = validate(form);

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await createUser(form);
      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        openInnerModal("success", triggerButton);
      } else {
        setError(response.error);
        openInnerModal("error", triggerButton);
      }
    } catch (error) {
      openInnerModal("error", triggerButton);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, fieldError, handleSubmit, handleChange };
}
