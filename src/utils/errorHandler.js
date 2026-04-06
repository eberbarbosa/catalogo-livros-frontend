export function tratarErro(error) {
    console.error("Erro tratado:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        code: error.code
    });

    if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
            if (Array.isArray(data?.errors)) {
                return data.errors.join(", ");
            }
            return data?.message || "Dados inválidos";
        }

        if (status === 404) {
            return "Recurso não encontrado";
        }

        if (status === 500) {
            return "Erro interno no servidor";
        }

        return "Erro inesperado";
    }

    // 🔥 NOVO TRATAMENTO
    if (error.code === "ERR_NETWORK") {
        return "Não foi possível conectar ao servidor";
    }

    if (error.request) {
        return "Sem resposta do servidor";
    }

    return "Erro ao processar requisição";
}