
import ListaLivros from "./components/ListaLivros/ListaLivros";

function App() {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
      <h1>📚 Catálogo de Livros</h1>
      <ListaLivros />
    </div>
  );
}

export default App;