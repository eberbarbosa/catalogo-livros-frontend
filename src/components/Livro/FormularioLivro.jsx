import { useState } from "react";
import { createLivro } from "../../services/livroService";
import "./FormularioLivro.css";
import { toast } from "react-toastify";

const FormularioLivro = ({ onLivroCriado }) => {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [preco, setPreco] = useState("");
    const [isbn, setIsbn] = useState("");
    const [anoPublicacao, setAnoPublicacao] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        const novoLivro = {
            titulo,
            autor,
            preco: parseFloat(preco),
            isbn,
            anoPublicacao: parseInt(anoPublicacao),
        };

        try {
            await createLivro(novoLivro);
            

            toast.success("Livro cadastrado com sucesso! 📚");

            // limpa formulário
            setTitulo("");
            setAutor("");
            setPreco("");
            setIsbn("");
            setAnoPublicacao("");

            // avisa o componente pai para atualizar lista
            if (onLivroCriado) {
                onLivroCriado();
            }

        } catch (error) {
            console.error(error);

            toast.error("Erro ao cadastrar livro ❌");
        }
    };

    return (
        <form className="form-livro" onSubmit={handleSubmit}>
            <h2>Cadastrar Livro</h2>

            <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Autor"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Preço"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Ano de Publicação"
                value={anoPublicacao}
                onChange={(e) => setAnoPublicacao(e.target.value)}
                required
            />

            <button type="submit">Salvar</button>
        </form>
    );
};

export default FormularioLivro;