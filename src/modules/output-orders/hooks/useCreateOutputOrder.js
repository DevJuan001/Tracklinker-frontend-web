import { useState } from "react";
import { createOutputOrderService } from "../services/createOutputOrderService";

export function useCreateOutputOrder() {
  const [form, setForm] = useState({
    out_order_id: "",
    product_serial: "",
    out_product_garanty: "",
    product_transformation: "",
  });

  const [loading, setLoading] = useState(false);

  // Manejo de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Envío del formulario
  const handleSubmit = async (e, setInnerModal) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createOutputOrderService(form);

      if (!response.success) {
        console.error("Error API:", response.error);
        setInnerModal("error");
        return;
      }

      setInnerModal("success");
    } catch (error) {
      console.error("Error inesperado:", error);
      setInnerModal("error");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    handleChange,
    handleSubmit,
  };
}
