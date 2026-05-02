import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createWarranty } from "../services/createWarranty";
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

    const buttonElement = e.currentTarget;
    const buttonRect = buttonElement.getBoundingClientRect();
    const triggerData = { currentTarget: buttonElement, rect: buttonRect };

    const isValid = validate(form);

    if (!isValid) {
      openInnerModal("error", triggerData);
      return;
    }

    setLoading(true);
    try {
      const response = await createWarranty(form);
      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["warranties"] });
        openInnerModal("success", triggerData);
      }
    } catch (error) {
      openInnerModal("error", triggerData);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleChange, handleSubmit };
}
