import { useEffect, useState } from "react";
import ListaLivros from "./components/Livro/ListaLivros";
import FormularioLivro from "./components/Livro/FormularioLivro";
import { buscarLivros } from "./services/livroService";

function App() {
  const [livros, setLivros] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const carregarLivros = async () => {
    const data = await buscarLivros();
    console.log("ATUALIZANDO LISTA:", data);
    setLivros([...data]);
  };

  const mostrarMensagem = (texto) => {
    setMensagem(texto);

    setTimeout(() => {
      setMensagem("");
    }, 3000); // some em 3s
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  return (
    <>
      {mensagem && (
        <div className="toast">
          {mensagem}
        </div>
      )}

      <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
        <h1>📚 Catálogo de Livros</h1>

        {/* 👇 FORMULÁRIO */}
        <FormularioLivro onLivroCriado={carregarLivros}
          mostrarMensagem={mostrarMensagem}
        />

        {/* 👇 LISTA */}
        <ListaLivros
          livros={livros}
          atualizarLista={carregarLivros}
          mostrarMensagem={mostrarMensagem}
        />
      </div>
    </>
  );
}

  export default App;