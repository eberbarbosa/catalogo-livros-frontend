import { useEffect, useState } from "react";
import LivroCard from "../../components/LivroCard/LivroCard";
import { buscarLivros } from "../../services/livroService";

function ListaLivros() {

  const [livros, setLivros] = useState([]);

  useEffect(() => {

    async function carregarLivros() {

      const dados = await buscarLivros();

      setLivros(dados);

    }

    carregarLivros();

  }, []);



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