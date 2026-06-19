import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createWarrantyService } from "../services/createWarrantyService";
import { getModalTrigger } from "../../../utils/getModalTrigger";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";

export function useCreateWarranty(product) {
  const [form, setForm] = useState({
    product_serial: product?.product_serial || "",
    customer: "",
    phone: "",
    address: "",
    city: "",
    description: "",
    link_attachments: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validate, clearError, fieldError } = useFormValidation();
  const queryClient = useQueryClient();

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
      const response = await createWarrantyService(form);

      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        queryClient.invalidateQueries({ queryKey: ["warranties"] });
        queryClient.invalidateQueries({ queryKey: ["warrantiesByStatus"] });
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

  return { form, loading, error, fieldError, handleChange, handleSubmit };
}
