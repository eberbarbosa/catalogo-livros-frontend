function Livros() {

  const livros = [
    { id: 1, titulo: "Dom Casmurro", autor: "Machado de Assis", preco: 39.90 },
    { id: 2, titulo: "Clean Code", autor: "Robert C. Martin", preco: 120.00 }
  ];

  return (
    <div>
      <h2>Lista de Livros</h2>

      {livros.map((livro) => (
        <div key={livro.id}>
          <h3>{livro.titulo}</h3>
          <p>Autor: {livro.autor}</p>
          <p>Preço: R$ {livro.preco}</p>
        </div>
      ))}

    </div>
  );
}

export default Livros;