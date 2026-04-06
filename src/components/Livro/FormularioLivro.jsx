import { useState } from "react";
import { criarLivro } from "@/services/livroService";
import "./FormularioLivro.css";
import { mensagens } from "@/utils/toastMessages";
import { toastSucesso } from "@/utils/toast";
import { tratarErro } from "@/utils/errorHandler";
import { toastErro } from "@/utils/toast";


const FormularioLivro = ({ onLivroCriado }) => {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [preco, setPreco] = useState("");
    const [isbn, setIsbn] = useState("");
    const [anoPublicacao, setAnoPublicacao] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        console.log("CLICOU NO BOTÃO");
        e.preventDefault();


        const novoLivro = {
            titulo,
            autor,
            preco: parseFloat(preco),
            isbn,
            anoPublicacao: parseInt(anoPublicacao),
        };

        
        const errosValidacao = validarLivro(novoLivro);

        if (Object.keys(errosValidacao).length > 0) {
            setErros(errosValidacao);
            return; // ⛔ BLOQUEIA ENVIO
        }

        setErros({}); // limpa erros se estiver tudo certo

        setLoading(true);
        console.log("INICIO");


        try {
            await criarLivro(novoLivro);

            await new Promise(resolve => setTimeout(resolve, 2000));

            toastSucesso(mensagens.sucesso.criar);

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
            toastErro(tratarErro("Erro ao criar livro:", error));
        }
        finally {
            setLoading(false); // 👈 ESSENCIAL
        }
    };

    const [erros, setErros] = useState({});

    function validarLivro(livro) {
        const erros = {};

        if (!livro.titulo || livro.titulo.trim().length < 3) {
            //erros.titulo = "Título deve ter pelo menos 3 caracteres";
            toastErro(erros.titulo ="Título dever ter pelo menos 3 caracteres");
        }

        if (!livro.preco || isNaN(livro.preco) || Number(livro.preco) <= 0) {
            toastErro(erros.preco = "Preço deve ser maior que zero");
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
                required
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
                required
            />

            <input
                type="number"
                placeholder="Ano de Publicação"
                value={anoPublicacao}
                onChange={(e) => setAnoPublicacao(e.target.value)}
                required
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