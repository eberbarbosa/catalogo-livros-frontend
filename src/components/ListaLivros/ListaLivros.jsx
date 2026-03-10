import { useEffect, useState } from "react";
import LivroCard from "../LivroCard/LivroCard";
import { buscarLivros } from "../../services/livroService";
import "./ListaLivros.css";

function ListaLivros() {

  const [livros, setLivros] = useState([]);

  useEffect(() => {
    buscarLivros().then((dados) => {
      setLivros(dados);
    });
  }, []);

  return (
    <div className="lista-livros">
      {livros.map((livro) => (
        <LivroCard key={livro.id} livro={livro} />
      ))}
    </div>
  );
}

export default ListaLivros;