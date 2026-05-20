import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useFormValidation } from "../../../globals/hooks/useFormValidation";
import { editSupplierService } from "../services/editSupplierService";

export function useEditSupplier(supplier) {
  const [form, setForm] = useState({
    name: supplier.name || "",
    email: supplier.email || "",
    phone: supplier.phone || "",
    city: supplier.city_id || "",
    address: supplier.address || "",
    status: supplier.status || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const quertyClient = useQueryClient();
  const { validate, getChanges, fieldError, clearError } = useFormValidation();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearError(name);
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

    const changes = getChanges(supplier, form);

    if (Object.keys(changes).length === 0) {
      openInnerModal("error", triggerData);
      return;
    }

    setLoading(true);

    try {
      const response = await editSupplierService(supplier.id, changes);

      if (response.success === true) {
        quertyClient.invalidateQueries({ queryKey: ["suppliers"] });
        openInnerModal("success", triggerData);
      } else {
        setError(response.error);
        openInnerModal("error", triggerData);
      }
    } catch {
      setError(
        "Por el momento no se puede editar el proveedor, por favor intente nuevamente más tarde.",
      );
      openInnerModal("error", triggerData);
    } finally {
      setLoading(false);
    }
  }

  return { form, loading, error, fieldError, handleChange, handleSubmit };
}
