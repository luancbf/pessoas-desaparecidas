import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function usePeopleStatistics() {
  return useQuery({
    queryKey: ["people-statistics"],
    queryFn: async () => {
      const response = await api.get("/pessoas/aberto/estatistico");
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}