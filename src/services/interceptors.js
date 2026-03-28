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
   

    return Promise.reject(error);
  }
);