// src/components/ListaLivros/ListaLivros.jsx
import { useEffect, useState } from "react";
import LivroCard from "../../components/LivroCard/LivroCard";
import { buscarLivros, editarLivro } from "../../services/livroService";
import "./ListaLivros.css";

function ListaLivros() {
  const [livros, setLivros] = useState([]);
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    preco: "",
    isbn: "",
    anoPublicacao: "",
  });

  // Carregar livros da API
  const carregarLivros = async () => {
    const dados = await buscarLivros();
    setLivros(Array.isArray(dados) ? dados : []);
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  // Abrir formulário de edição
  const editarLivroHandler = (livro) => {
    console.log("Editar livro chamado:", livro); // <-- log para teste
    setLivroSelecionado(livro);
    setFormData({
      titulo: livro.titulo,
      autor: livro.autor,
      preco: livro.preco,
      isbn: livro.isbn,
      anoPublicacao: livro.anoPublicacao,
    });
  };

  // Atualizar campos do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Salvar alterações do livro
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!livroSelecionado) return;

    const livroAtualizado = {
      ...livroSelecionado,
      ...formData,
      preco: parseFloat(formData.preco),
      anoPublicacao: parseInt(formData.anoPublicacao),
    };

    try {
      await editarLivro(livroSelecionado.id, livroAtualizado);
      setLivroSelecionado(null);
      setFormData({
        titulo: "",
        autor: "",
        preco: "",
        isbn: "",
        anoPublicacao: "",
      });
      carregarLivros();
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
    }
  };

  return (
    <div className="lista-livros">
      <h2>Lista de Livros</h2>

      {livros.map((livro) => (
        <LivroCard
          key={livro.id}
          livro={livro}
          onEditar={editarLivroHandler} // <-- função passada para o botão
        />
      ))}

      {livroSelecionado && (
        <div className="form-edicao">
          <h3>Editando: {livroSelecionado.titulo}</h3>
          <form onSubmit={handleSubmit}>
            <input
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Título"
              required
            />
            <input
              name="autor"
              value={formData.autor}
              onChange={handleChange}
              placeholder="Autor"
              required
            />
            <input
              name="preco"
              type="number"
              step="0.01"
              value={formData.preco}
              onChange={handleChange}
              placeholder="Preço"
              required
            />
            <input
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="ISBN"
              required
            />
            <input
              name="anoPublicacao"
              type="number"
              value={formData.anoPublicacao}
              onChange={handleChange}
              placeholder="Ano de Publicação"
              required
            />
            <button type="submit">Salvar</button>
            <button type="button" onClick={() => setLivroSelecionado(null)}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ListaLivros;