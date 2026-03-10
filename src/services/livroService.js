const API_URL = "http://localhost:8080/livros";

export const buscarLivros = async () => {
  try {

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Erro ao buscar livros");
    }

    const data = await response.json();

    console.log("Resposta da API:", data);

    return data.data || []; // 👈 AQUI está a correção

  } catch (error) {

    console.error("Erro na requisição:", error);

    return [];

  }
};