// src/components/LivroCard/LivroCard.jsx
import React from "react";
import "./LivroCard.css";

function LivroCard({ livro, onEditar, onDeletar }) {
  return (
    <div className="livro-card">
      <h3>{livro.titulo}</h3>
      <p>Autor: {livro.autor}</p>
      <p>Preço: R$ {livro.preco}</p>
      <p>ISBN: {livro.isbn}</p>
      <p>Ano: {livro.anoPublicacao}</p>
      {onEditar && (
        <button onClick={() => onEditar(livro)}>✏️ Editar</button>
      )}
      {onDeletar && (
        <button onClick={() => onDeletar(livro.id)}>
          🗑️ Deletar
        </button>
      )}
    </div>
  );
}

export default LivroCard;