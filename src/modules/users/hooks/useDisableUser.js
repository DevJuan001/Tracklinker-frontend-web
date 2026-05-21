import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { disableUserService } from "../services/disableUserService";
import { getModalTrigger } from "../../../utils/getModalTrigger";

export function useDisableUser(userId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  async function handleSubmit(e, openInnerModal, closeModal) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    setLoading(true);

    try {
      const response = await disableUserService(userId);
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: ["users"] });
        closeModal();
      } else {
        setError(response.error);
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError(
        "No se pudo deshabilitar el usuario. Inténtalo de nuevo más tarde.",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { handleSubmit, loading, error };
}
