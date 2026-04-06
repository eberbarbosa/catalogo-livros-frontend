export function tratarErro(error) {
    console.log("Erro completo:", error);

    if (error.response) {
        const { status, data } = error.response;

        // Erros de validação (400)
        if (status === 400) {
            return data.message || "Dados inválidos";
        }

        // Não encontrado (404)
        if (status === 404) {
            return "Recurso não encontrado";
        }

        // Erro interno (500)
        if (status === 500) {
            return "Erro interno no servidor";
        }

        return "Erro inesperado";
    }

    // Sem resposta (backend caiu, rede, etc)
    if (error.request) {
        return "Sem resposta do servidor";
    }

    // Erro desconhecido
    return "Erro ao processar requisição";
}