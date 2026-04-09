import { api } from "./api";

let isInterceptorSet = false;

export const setupInterceptors = (setLoading) => {
  if (isInterceptorSet) return;
  isInterceptorSet = true;

  // REQUEST
  api.interceptors.request.use(
    (config) => {
      setLoading(true); // 🔥 AQUI

      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Basic ${token}`;
      }

      console.log("➡️ Requisição:", config);
      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  // RESPONSE
  api.interceptors.response.use(
    (response) => {
      setLoading(false); // 🔥 AQUI

      console.log("✅ Resposta:", response);
      return response;
    },
    (error) => {
      setLoading(false); // 🔥 AQUI

      console.error("❌ Erro global:", error);
      return Promise.reject(error);
    }
  );
};