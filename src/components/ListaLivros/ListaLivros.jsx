
import LivroCard from "../../components/LivroCard/LivroCard";


function ListaLivros({ livros }) {
  return (
    <div>
      <h2>Lista de Livros</h2>

      {Array.isArray(livros) ? (
        livros.map(livro => (
          <div key={livro.id}>{livro.titulo}</div>
        ))
      ) : (
        <p>Erro ao carregar livros</p>
      )}
    </div>
  );
}

export default ListaLivros;