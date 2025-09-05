import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function usePerson(id: string) {
  return useQuery({
    queryKey: ["person", id],
    queryFn: async () => {
      const { data } = await api.get(`/pessoas/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 30_000,
  });
}