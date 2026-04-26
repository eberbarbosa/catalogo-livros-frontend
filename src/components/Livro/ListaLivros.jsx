import { useState, useEffect } from "react";
import LivroCard from "./LivroCard";
import { editarLivro, deletarLivro, buscarLivros, listarLivros } from "@/services/livroService";
import "./ListaLivros.css";
import { toast } from "react-toastify";


function ListaLivros({ refresh, atualizarLista }) {

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

  // 🔥 RESETA PARA PÁGINA 0 QUANDO CRIA/ATUALIZA
  useEffect(() => {
    setPagina(0);
  }, [refresh]);


  // 🔥 BUSCA COM DEBOUNCE (CORRETO)
  useEffect(() => {
    console.log("[LISTA] useEffect disparou", { busca, pagina, refresh });
    const timeout = setTimeout(() => {
      const carregarLivros = async () => {
        try {
          setLoading(true);

          console.log("[LISTA] Buscando livros...", {
            busca,
            pagina,
            tamanho
          });

          const dados = busca
            ? await buscarLivros(busca, pagina, tamanho)
            : await listarLivros(pagina, tamanho);


          setLista(dados);
          console.log("[LISTA] Livros recebidos:", dados);
          setTemMais(dados.length === tamanho && dados.length > 0);
        } catch (error) {
          console.error("[LISTA] Erro ao buscar livros:", error);

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
  const handleDelete = (id) => {

    toast(
      ({ closeToast }) => (
        <div>
          <p>🗑 Tem certeza que deseja deletar este livro?</p>

          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button
              onClick={async () => {
                try {
                  await deletarLivro(id);
                  toast.success("Livro deletado com sucesso! 🗑");
                  atualizarLista();
                } catch (error) {
                  console.error("Erro ao deletar:", error);
                  toast.error("Erro ao deletar livro ❌");
                }
                closeToast();
              }}
              style={{ cursor: "pointer" }}
            >
              Confirmar
            </button>

            <button
              onClick={closeToast}
              style={{ cursor: "pointer" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
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

      {/* 🔄 LOADING */}
      {loading && <p>🔄 Carregando livros...</p>}

      {/* 📭 LISTA VAZIA */}
      {!loading && lista.length === 0 && (
        <p>📚 Nenhum livro encontrado.</p>
      )}

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
          disabled={pagina === 0 || loading}
        >
          ⬅️ Anterior
        </button>

        <span style={{ margin: "0 10px" }}>
          Página {pagina + 1} {loading && "⏳"}
        </span>

        <button
          onClick={() => setPagina((prev) => prev + 1)}
          disabled={!temMais || loading}
        >
          Próxima ➡️
        </button>
      </div>
    </div>
  );
}

export default ListaLivros;