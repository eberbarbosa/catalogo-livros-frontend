import axios from "axios";

const API_URL = "http://localhost:8080/livros";

export const buscarLivros = async () => {
  try {

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Erro ao buscar livros");
    }

    const data = await response.json();

    console.log("Resposta da API:", data);

    return data.data;

  } catch (error) {

    console.error("Erro na requisição:", error);

    return [];

  }
};

// POST
export const createLivro = async (livro) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Erro da API:", errorData);
      throw new Error("Erro ao criar livro");
    }

    return await response.json();

  } catch (error) {
    console.error("Erro completo:", error);
    throw error;
  }
};

//PUT
export const editarLivro = async (id, livroAtualizado) => {
  const response = await fetch(`http://localhost:8080/livros/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(livroAtualizado),
  });

  if (!response.ok) {
    throw new Error("!!! Erro ao Atualizar o livro !!!")
  }

  return await response.json();
};

// DELETAR
export const deletarLivro = async (id) => {
  return fetch(`http://localhost:8080/livros/${id}`, {
    method: "DELETE",
  });
};