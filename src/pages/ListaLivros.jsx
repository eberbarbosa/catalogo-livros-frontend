import "./ListaLivros.css";

function ListaLivros() {

  return (
    <div className="lista-livros">
      {livros.map((livro) => (
        <LivroCard key={livro.id} livro={livro} />
      ))}
    </div>
  );

}