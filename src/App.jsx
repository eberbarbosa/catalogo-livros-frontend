import { useEffect, useState } from "react";
import ListaLivros from "./components/Livro/ListaLivros";
import FormularioLivro from "./components/Livro/FormularioLivro";
import { buscarLivros } from "./services/livroService";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [livros, setLivros] = useState([]);

  const carregarLivros = async () => {
    const data = await buscarLivros();
    console.log("ATUALIZANDO LISTA:", data);
    setLivros([...data]);
  };


  useEffect(() => {
    carregarLivros();
  }, []);

  return (
    <Layout>

      <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
        

        {/* 👇 FORMULÁRIO */}
        <FormularioLivro onLivroCriado={carregarLivros}
        />

        {/* 👇 LISTA */}
        <ListaLivros
          livros={livros}
          atualizarLista={carregarLivros}
        />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="dark"
        />

      </div>
    </Layout>
  );
}

export default App;