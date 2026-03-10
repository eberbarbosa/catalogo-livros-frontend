import { useEffect, useState } from "react";
import LivroCard from "../../components/LivroCard/LivroCard";
import { buscarLivros } from "../../services/livroService";

function ListaLivros() {

  const [livros, setLivros] = useState([]); // 👈 importante

  useEffect(() => {

    async function carregarLivros() {

      const dados = await buscarLivros();

      setLivros(dados);

    }

    carregarLivros();

  }, []);

  
  console.log(livros);

  return (
    <div>
      <h2>Lista de Livros</h2>

      {livros.map((livro) => (
        <LivroCard key={livro.id} livro={livro} />
      ))}

    </div>
  );
}

export default ListaLivros;