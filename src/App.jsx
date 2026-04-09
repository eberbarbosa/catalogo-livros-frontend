import { useEffect, useState } from "react";
import ListaLivros from "./components/Livro/ListaLivros";
import FormularioLivro from "./components/Livro/FormularioLivro";
import { buscarLivros } from "./services/livroService";
import Layout from "@/components/layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "@/components/layout/LoadingOverlay";
import { setupInterceptors } from "@/services/interceptors";
import { useLoading } from "@/context/LoadingContext";

function App() {
  const { setLoading } = useLoading();
  const [livros, setLivros] = useState([]);

  useEffect(() => {
 //   setupInterceptors(setLoading); 
  }, []);

  const carregarLivros = async () => {
    const data = await buscarLivros();
    console.log("ATUALIZANDO LISTA:", data);
    setLivros([...data]);
  };


  useEffect(() => {
    carregarLivros();
  }, []);

  return (
    <>
      <LoadingOverlay />


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
    </>
  );
}

export default App;