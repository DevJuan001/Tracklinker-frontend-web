import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { updateWarranty } from "../services/updateWarranty";
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

    if (!isValid) {
      openInnerModal("error", triggerButton);
    }

    const changes = getChanges(selectedWarranty, form);

    if (Object.keys(changes).length === 0) {
      openInnerModal("error", triggerButton);
      return;
    }

    setLoading(true);

    try {
      const response = await updateWarranty(selectedWarranty.id, {
        ...changes,
        product_serial: selectedWarranty.product_serial,
      });
      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["warranties"] });
        queryClient.invalidateQueries({ queryKey: ["products"] });
        openInnerModal("success", triggerButton);
      } else {
        openInnerModal("error", triggerButton);
      }
    } catch {
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }
  return { form, handleChange, handleSubmit, loading };
}
