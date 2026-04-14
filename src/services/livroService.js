import { api } from "./api";

// GET
export const listarLivros = async (page = 0, size = 5) => {
  const response = await api.get("/livros", {
    params: { page, size }
  });

  return response.data.data;
};

// POST
export const criarLivro = async (livro) => {
  const response = await api.post("/livros", livro);
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
  const response = await api.get("/livros", {
    params: { titulo, page, size }
  });

  return response.data.data;
};

