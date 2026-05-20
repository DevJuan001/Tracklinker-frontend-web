import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { updateWarrantyService } from "../services/updateWarrantyService";
import { getModalTrigger } from "../../../utils/getModalTrigger";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";

export function useEditWarranty(selectedWarranty) {
  const [form, setForm] = useState({
    product_serial: selectedWarranty.product_serial,
    customer: selectedWarranty.customer,
    phone: selectedWarranty.phone,
    address: selectedWarranty.address,
    city: selectedWarranty.city,
    link_attachments: selectedWarranty.link_attachments,
    description: selectedWarranty.description,
    status: selectedWarranty.status,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { validate, getChanges } = useFormValidation();
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e, openInnerModal) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    const isValid = validate(form);

    if (!isValid) return;

    const changes = getChanges(selectedWarranty, form);

    if (Object.keys(changes).length === 0) return;

    setLoading(true);

    try {
      const response = await updateWarrantyService(selectedWarranty.id, {
        ...changes,
        product_serial: selectedWarranty.product_serial,
      });

      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        queryClient.invalidateQueries({ queryKey: ["warranties"] });
        openInnerModal("success", triggerButton);
      } else {
        setError(response.error);
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError(
        " No se pudo editar la garantía. Por favor, intenta de nuevo más tarde.",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }
  return { form, handleChange, handleSubmit, loading, error };
}
