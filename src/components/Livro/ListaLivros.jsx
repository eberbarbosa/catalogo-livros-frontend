import { useState, useEffect } from "react";
import LivroCard from "./LivroCard";
import { editarLivro, deletarLivro, buscarLivros, listarLivros } from "@/services/livroService";
import "./ListaLivros.css";
import { toast } from "react-toastify";

function ListaLivros({ refresh }) {

  // STATES
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [busca, setBusca] = useState("");
  const [lista, setLista] = useState([]);
  const [temMais, setTemMais] = useState(true);


  const [loading, setLoading] = useState(false);
  const [pagina, setPagina] = useState(0);
  const [tamanho] = useState(5);

  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    preco: "",
    isbn: "",
    anoPublicacao: "",
  });


  // 🔥 BUSCA COM DEBOUNCE (CORRETO)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const carregarLivros = async () => {
        try {
          setLoading(true);

          const dados = busca
            ? await buscarLivros(busca, pagina, tamanho)
            : await listarLivros(pagina, tamanho);

          setLista(dados);
          setTemMais(dados.length === tamanho);
        } catch (error) {
          console.error("Erro ao buscar livros:", error);
        } finally {
          setLoading(false);
        }
      };

      carregarLivros();
    }, 500);

    return () => clearTimeout(timeout);
  }, [busca, pagina, refresh]);

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

      toast.success("Livro atualizado com sucesso ✏️");

      setLivroSelecionado(null);
      setFormData({
        titulo: "",
        autor: "",
        preco: "",
        isbn: "",
        anoPublicacao: "",
      });

      // 🔥 força recarregar lista após edição
      const dados = busca
        ? await buscarLivros(busca)
        : await listarLivros();

  

    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      toast.error("Erro ao atualizar livro ❌");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deletarLivro(id);
      toast.success("Livro deletado com sucesso! 🗑");

      // 🔥 recarrega lista após delete
      const dados = busca
        ? await buscarLivros(busca)
        : await listarLivros();

      

    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };



  return (
    <div className="lista-livros">
      <h2>Lista de Livros</h2>

      {/* 🔍 CAMPO DE BUSCA */}
      <input
        type="text"
        placeholder="Buscar por título..."
        value={busca}
        onChange={(e) => {
          setBusca(e.target.value);
          setPagina(0); // 🔥 ESSENCIAL
        }}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "400px"
        }}
      />

      {/* LISTA */}
      {lista.map((livro) => (
        <LivroCard
          key={livro.id}
          livro={livro}
          onEditar={editarLivroHandler}
          onDeletar={handleDelete}
        />
      ))}

      {/* FORM DE EDIÇÃO */}
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

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPagina((prev) => prev - 1)}
          disabled={pagina === 0}
        >
          ⬅️ Anterior
        </button>

        <span style={{ margin: "0 10px" }}>
          Página {pagina + 1}
        </span>

        <button
          onClick={() => setPagina((prev) => prev + 1)}
          disabled={!temMais}
        >
          Próxima ➡️
        </button>
      </div>
    </div>
  );
}

export default ListaLivros;