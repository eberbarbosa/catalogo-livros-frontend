import { api } from "./api";

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    // Exemplo: adicionar token futuramente
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Basic ${token}`;
    }

    console.log("➡️ Requisição:", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    console.log("✅ Resposta:", response);
    return response;
  },
  (error) => {
    console.error("❌ Erro global:", error);

    if (error.response) {
      switch (error.response.status) {
        case 401:
          alert("Não autorizado! Faça login.");
          break;
        case 500:
          alert("Erro no servidor.");
          break;
        default:
          alert("Erro inesperado.");
      }
    }

    return Promise.reject(error);
  }
);