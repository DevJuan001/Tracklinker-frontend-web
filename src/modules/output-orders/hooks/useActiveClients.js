import { useQuery } from "@tanstack/react-query";
import { getActiveClientsService } from "../services/getActiveClientsService";

export function useActiveClients() {
  const clients = useQuery({
    queryKey: ["activeClients"],
    queryFn: getActiveClientsService,
    staleTime: 1000 * 60 * 10,
  });

  return {
    clients: clients.data || [],
    loading: clients.isLoading,
    error: clients.error,
  };
}
