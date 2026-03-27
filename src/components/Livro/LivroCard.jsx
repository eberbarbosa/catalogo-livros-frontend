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
      <div className="livro-acoes">
        {onEditar && (
          <button
            className="btn btn-editar"
            onClick={() => onEditar(livro)}
          >
            Editar
          </button>
        )}

        {onDeletar && (
          <button
            className="btn btn-deletar"
            onClick={() => onDeletar(livro.id)}
          >
            Deletar
          </button>
        )}
      </div>
      
    </div>
  );
}

export default LivroCard;