import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { PersonStatus, PersonSex } from "../types/person";

type UsePeopleParams = {
  page: number;
  size: number;
  q?: string;
  status?: PersonStatus | "";
  sex?: PersonSex | "";
};

export function usePeople({ page, size, q, status, sex }: UsePeopleParams) {
  return useQuery({
    queryKey: ["people", page, size, q, status, sex],
    queryFn: async () => {
      const params = new URLSearchParams({
        pagina: (page - 1).toString(),
        porPagina: size.toString(),
      });

      if (q && q.trim()) {
        params.append("nome", q.trim());
      }

      if (sex) {
        params.append("sexo", sex);
      }

      if (status) {
        params.append("status", status);
      }

      console.log("Parâmetros enviados para API:", params.toString());

      const response = await api.get(`/pessoas/aberto/filtro?${params}`);
      return response.data;
    },
    staleTime: 2 * 60 * 1000,
  });
}