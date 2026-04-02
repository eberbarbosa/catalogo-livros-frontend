export const tratarErro = (error) => {
    if (error.response) {
        if (typeof error.response.data === "string") {
            return error.response.data;
        }
        return error.response.data?.message || "Erro no servidor ❌";
    } else if (error.request) {
        return "Não foi possível conectar ao servidor 🌐";
    }
    return "Erro inesperado ❌";
};