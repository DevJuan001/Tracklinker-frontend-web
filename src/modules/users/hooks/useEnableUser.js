import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { enableUserService } from "../services/enableUserService";
import { getModalTrigger } from "../../../utils/getModalTrigger";

export function useEnableUser(userId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  async function handleSubmit(e, openInnerModal, closeModal) {
    e.preventDefault();

    const triggerButton = getModalTrigger(e);

    setLoading(true);

    try {
      const response = await enableUserService(userId);

      if (response.success === true) {
        await queryClient.invalidateQueries({ queryKey: ["users"] });
        closeModal();
      } else {
        setError(response.error);
        openInnerModal("error", triggerButton);
      }
    } catch {
      setError(
        "No se pudo habilitar el usuario. Inténtalo de nuevo más tarde.",
      );
      openInnerModal("error", triggerButton);
    } finally {
      setLoading(false);
    }
  }

  return { handleSubmit, loading, error };
}
