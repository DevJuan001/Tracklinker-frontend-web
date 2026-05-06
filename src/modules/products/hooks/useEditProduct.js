import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getModalTrigger } from "../../../utils/getModalTrigger";
import { editProductService } from "../services/editProductService";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";

export function useEditProduct(product) {
  const queryClient = useQueryClient();
  const { validate, getChanges } = useFormValidation();

  const [form, setForm] = useState({
    id: product.product_id,
    input_order_id: product.input_order_id || "",
    subcategory_id: product.subcategory_id || "",
    product_serial: product.product_serial || "",
    brand_id: product.brand_id || "",
    model_id: product.model_id || "",
    warranty_time: product.warranty_time || "",
    product_details_id: product.product_details_id,
    status: product.status || "",
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

    const triggerButton = getModalTrigger(e);

    const isValid = validate(form);

    if (!isValid) {
      openInnerModal("error", triggerButton);
      return;
    }

    const changes = getChanges(product, form);

    if (Object.keys(changes).length === 0) {
      openInnerModal("error", triggerButton);
      return;
    }

    setLoading(true);

    try {
      if (Object.keys(changes).length > 1) {
        const response = await editProductService({
          id: product.product_id,
          product_details_id: product.product_details_id,
          ...changes,
        });

        if (response.success === true) {
          queryClient.invalidateQueries({ queryKey: ["products"] });
          openInnerModal("success", triggerButton);
        } else {
          openInnerModal("error", triggerButton);
        }
      } else {
        openInnerModal("error", triggerButton);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, handleChange, handleSubmit };
}
