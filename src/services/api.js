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

        if (error.response) {
            // Erro vindo do backend
            const mensagem =
                error.response.data?.message || "Erro na requisição";

            alert(mensagem); // depois vamos melhorar isso
        } else if (error.request) {
            alert("Servidor não respondeu. Tente novamente.");
        } else {
            alert("Erro inesperado.");
        }

        return Promise.reject(error);
    }
);