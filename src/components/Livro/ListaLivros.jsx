import { useState } from "react";
import LivroCard from "./LivroCard";
import { editarLivro, deletarLivro } from "../../services/livroService";
import "./ListaLivros.css";

function ListaLivros({ livros, atualizarLista }) {

  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    preco: "",
    isbn: "",
    anoPublicacao: "",
  });

  // EDITAR
  const editarLivroHandler = (livro) => {
    setLivroSelecionado(livro);
    setFormData({
      titulo: livro.titulo,
      autor: livro.autor,
      preco: livro.preco,
      isbn: livro.isbn,
      anoPublicacao: livro.anoPublicacao,
    });
  };

  // INPUT
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // SALVAR
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

      atualizarLista(); // 🔥 correto agora

    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
    }
  };

  // DELETE (usando service)
  const handleDelete = async (id) => {
    try {
      await deletarLivro(id);
      alert("Livro deletado com sucesso!");
      atualizarLista(); // 🔥 correto
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <div className="lista-livros">
      <h2>Lista de Livros</h2>

      {livros.map((livro) => (
        <LivroCard
          key={livro.id}
          livro={livro}
          onEditar={editarLivroHandler}
          onDeletar={handleDelete}
        />
      ))}
     

      {livroSelecionado && (
        <div className="form-edicao">
          <h3>Editando: {livroSelecionado.titulo}</h3>
          <form onSubmit={handleSubmit}>
            <input name="titulo" value={formData.titulo} onChange={handleChange} required />
            <input name="autor" value={formData.autor} onChange={handleChange} required />
            <input name="preco" type="number" value={formData.preco} onChange={handleChange} required />
            <input name="isbn" value={formData.isbn} onChange={handleChange} required />
            <input name="anoPublicacao" type="number" value={formData.anoPublicacao} onChange={handleChange} required />

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