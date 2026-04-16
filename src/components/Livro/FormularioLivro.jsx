import { useState } from "react";
import { criarLivro } from "@/services/livroService";
import "./FormularioLivro.css";
import { mensagens } from "@/utils/toastMessages";
import { toastSucesso } from "@/utils/toast";
import { tratarErro } from "@/utils/errorHandler";
import { toastErro } from "@/utils/toast";
import { log } from "@/utils/logger";


const FormularioLivro = ({ onLivroCriado }) => {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [preco, setPreco] = useState("");
    const [isbn, setIsbn] = useState("");
    const [anoPublicacao, setAnoPublicacao] = useState("");
    const [loading, setLoading] = useState(false);
    const [erros, setErros] = useState({});



    const handleSubmit = async (e) => {
        e.preventDefault();        

        const novoLivro = {
            titulo,
            autor,
            preco: preco !== "" ? Number(preco) : null,
           // preco: preco ? parseFloat(preco) : null,
            isbn,
            anoPublicacao: anoPublicacao ? parseInt(anoPublicacao) : null,
        };

        console.log("[FORM] Payload:", novoLivro);

        const errosValidacao = validarLivro(novoLivro);

        if (Object.keys(errosValidacao).length > 0) {
            console.log("❌ ERROS:", errosValidacao);

            setErros(errosValidacao);

            Object.values(errosValidacao).forEach((msg) => {
                toastErro(msg);
            });

            return;
        }

        setErros({});
        setLoading(true);

        try {
            console.log("[FORM] Chamando API POST /livros");

            await new Promise(resolve => setTimeout(resolve, 1000));

            await criarLivro(novoLivro);

            console.log("[FORM] Livro criado com sucesso");

            toastSucesso(mensagens.sucesso.criar);

            // limpar formulário
            setTitulo("");
            setAutor("");
            setPreco("");
            setIsbn("");
            setAnoPublicacao("");

            if (onLivroCriado) {
                onLivroCriado();
            }

        } catch (error) {
            console.error("[FORM] Erro ao criar livro:", error);
            toastErro(tratarErro(error));
        } finally {
            setLoading(false);
        }
    };



    function validarLivro(livro) {
        const erros = {};

        if (!livro.titulo || livro.titulo.trim().length < 3) {
            erros.titulo = "Título deve ter pelo menos 3 caracteres";

        }

        if (!livro.preco || isNaN(livro.preco) || Number(livro.preco) <= 0) {
            erros.preco = "Preço deve ser maior que zero";
        }

        return erros;
    }

    return (
        <form className="form-livro" onSubmit={handleSubmit}>
            <h2>Cadastrar Livro</h2>

            <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}

            />{erros.titulo && <span className="erro">{erros.titulo}</span>}


            <input
                type="text"
                placeholder="Autor"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
            //required
            />

            <input
                type="number"
                placeholder="Preço"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}

            />
            {erros.preco && <span className="erro">{erros.preco}</span>}

            <input
                type="text"
                placeholder="ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
            //required
            />

            <input
                type="number"
                placeholder="Ano de Publicação"
                value={anoPublicacao}
                onChange={(e) => setAnoPublicacao(e.target.value)}
            //required
            />

            <button type="submit" disabled={loading} className="btn-salvar">
                {loading ? (
                    <>
                        <span className="spinner"></span>
                        Salvando...
                    </>
                ) : (
                    "Salvar"
                )}
            </button>
        </form>
    );
};


export default FormularioLivro;