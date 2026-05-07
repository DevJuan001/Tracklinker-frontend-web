import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createWarranty } from "../services/createWarranty";
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
  const { validate } = useFormValidation();
  const queryClient = useQueryClient();

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    const isValid = validate(form);

    if (!isValid) {
      setError(
        "Verifica que los campos no esten vacios e intentalo nuevamente",
      );
      openInnerModal("error", triggerButton);
      return;
    }

    setLoading(true);
    try {
      const response = await createWarranty(form);

      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        queryClient.invalidateQueries({ queryKey: ["warranties"] });
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

  return { form, loading, error, handleChange, handleSubmit };
}
