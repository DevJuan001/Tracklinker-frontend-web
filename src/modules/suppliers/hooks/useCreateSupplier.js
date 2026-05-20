import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";
import { createSupplierService } from "../services/createSupplierService";
import { getModalTrigger } from "../../../utils/getModalTrigger";

export function useCreateSupplier() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
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

  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    const isValid = validate(form);

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await createSupplierService(form);

      if (response.success === true) {
        openInnerModal("success", triggerButton);
        queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      } else {
        setError(response.error);
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError(
        "Por el momento no se puede crear el proveedor, por favor intente nuevamente más tarde.",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, fieldError, handleChange, handleSubmit };
}
