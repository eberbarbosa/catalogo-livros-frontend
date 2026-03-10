import "./LivroCard.css"; 

function LivroCard({ livro }) {
  return (
    <div className="livro-card">
      <h3>{livro.titulo}</h3>
      <p><strong>Autor:</strong> {livro.autor}</p>
      <p><strong>Preço:</strong> R$ {livro.preco}</p>
    </div>
  );
}

export default LivroCard;