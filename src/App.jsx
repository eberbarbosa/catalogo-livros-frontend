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
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    //   setupInterceptors(setLoading); 
  }, []);

  const recarregarLista = () => {
    console.log("[APP] Trigger refresh lista");
    setRefresh((prev) => !prev);
  };



  return (
    <>
      <LoadingOverlay />


      <Layout>

        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>


          {/* 👇 FORMULÁRIO */}
          <FormularioLivro onLivroCriado={recarregarLista} />


          {/* 👇 LISTA */}
          <ListaLivros atualizarLista={recarregarLista} refresh={refresh} />


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