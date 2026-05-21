import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { editUserService } from "../services/editUserService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";
import { getModalTrigger } from "../../../utils/getModalTrigger";

export function useEditUser(user) {
  const [form, setForm] = useState({
    rol_id: user.rol_id || "",
    name: user.name || "",
    first_surname: user.first_surname || "",
    second_surname: user.second_surname || "",
    address: user.address || "",
    city: user.city || "",
    email: user.email || "",
    phone: user.phone || "",
    status: user.status || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { validate, getChanges, fieldError, clearError } = useFormValidation();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  }

  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    const isValid = validate(form);

    if (!isValid) {
      return;
    }

    const changes = getChanges(user, form);

    if (Object.keys(changes).length === 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await editUserService(user.id, changes);

      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        openInnerModal("success", triggerButton);
      } else {
        setError(response.error);
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError("No se pudo editar el usuario. Inténtalo de nuevo más tarde.");
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { handleChange, handleSubmit, fieldError, loading, error, form };
}
