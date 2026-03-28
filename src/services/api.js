import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

// 🔹 Interceptor de resposta
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("Erro na API:", error);

        // 👇 NÃO FAZ MAIS NADA AQUI
        return Promise.reject(error);
    }
);