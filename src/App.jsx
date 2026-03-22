import { useEffect, useState } from "react";
import ListaLivros             from "./components/ListaLivros/ListaLivros";
import FormularioLivro         from "./components/FormularioLivro";
import { buscarLivros }        from "./services/livroService";

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
    <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
      <h1>📚 Catálogo de Livros</h1>

      {/* 👇 FORMULÁRIO */}
      <FormularioLivro onLivroCriado={carregarLivros} />

      {/* 👇 LISTA */}
      <ListaLivros livros={livros} />
    </div>
  );
}

export default App;