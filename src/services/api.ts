import axios from "axios";
export const api = axios.create({
  baseURL: "https://abitus-api.geia.vip/v1",
  timeout: 15000,
});

api.interceptors.response.use(
  r => r,
  err => {
    let message = "Erro desconhecido. Tente novamente.";
    if (err.response) {
      switch (err.response.status) {
        case 400:
          message = "Requisição inválida.";
          break;
        case 401:
          message = "Não autorizado.";
          break;
        case 404:
          message = "Recurso não encontrado.";
          break;
        case 500:
          message = "Erro interno do servidor.";
          break;
        default:
          message = err.response.data?.message || message;
      }
    } else if (err.request) {
      message = "Sem resposta do servidor. Verifique sua conexão.";
    }
    return Promise.reject({
      ...err,
      customMessage: message,
    });
  }
);
