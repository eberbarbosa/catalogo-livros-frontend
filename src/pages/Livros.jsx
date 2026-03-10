import LivroCard from "../components/LivroCard";

function Livros() {

  const livros = [
    { id: 1, titulo: "Dom Casmurro", autor: "Machado de Assis", preco: 39.90 },
    { id: 2, titulo: "Clean Code", autor: "Robert C. Martin", preco: 120.00 }
  ];

  return (
  <div style={{ maxWidth: "600px", margin: "40px auto" }}>
    <h2>Lista de Livros</h2>

    {livros.map((livro) => (
      <LivroCard key={livro.id} livro={livro} />
    ))}
  </div>
);

}

export default Livros;