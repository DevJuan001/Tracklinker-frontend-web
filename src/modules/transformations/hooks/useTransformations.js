// src/modules/transformations/hooks/useTransformations.js
import { useState, useEffect } from "react";
import { getTransformations } from "../services/getTransformations";

export function useTransformations() {
  const [transformations, setTransformations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransformations = async () => {
    try {
      setLoading(true);
      const data = await getTransformations();
      setTransformations(data);
    } catch (err) {
      console.error("Error al cargar transformaciones:", err);
      setError(err.message || "Error al obtener transformaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransformations();
  }, []);

  return { transformations, loading, error, fetchTransformations };
}
