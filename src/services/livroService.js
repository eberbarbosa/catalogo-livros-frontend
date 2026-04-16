import { api } from "./api";

const handleRequest = async (request) => {
  try {
    const response = await request;

    // 🔥 trata diferentes formatos de resposta
    return response.data?.data ?? response.data;

  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};

// GET
export const listarLivros = async (page = 0, size = 5) => {
  const response = await api.get("/livros", {
    params: { page, size }
  });

  return response.data.data;
};

// POST
export const criarLivro = async (livro) => {
  console.log("[SERVICE] POST /livros", livro);

  const response = await api.post("/livros", livro);

  console.log("[SERVICE] Response:", response.data);

  return response.data;
};

// PUT
export const editarLivro = async (id, livroAtualizado) => {
  const response = await api.put(`/livros/${id}`, livroAtualizado);
  return response.data;
};

// DELETE
export const deletarLivro = async (id) => {
  await api.delete(`/livros/${id}`);
};


// FUNÇÃO PARA BUSCAR LIVRO
export const buscarLivros = async (titulo, page = 0, size = 5) => {
  console.log("[SERVICE] GET /livros", { titulo, pagina, tamanho });
  const response = await api.get("/livros", {
    params: { titulo, page, size }
  });

  return response.data.data;
};

