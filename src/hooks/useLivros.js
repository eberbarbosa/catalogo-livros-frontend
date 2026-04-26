import { useState, useEffect } from "react";
import { buscarLivros, listarLivros } from "@/services/livroService";

export function useLivros(refresh) {

    const [busca, setBusca] = useState("");
    const [lista, setLista] = useState([]);
    const [pagina, setPagina] = useState(0);
    const [tamanho] = useState(5);
    const [loading, setLoading] = useState(false);
    const [temMais, setTemMais] = useState(true);

    // reset página quando refresh mudar
    useEffect(() => {
        setPagina(0);
    }, [refresh]);

    // debounce + fetch
    useEffect(() => {
        const timeout = setTimeout(() => {

            const carregarLivros = async () => {
                try {
                    setLoading(true);

                    const dados = busca
                        ? await buscarLivros(busca, pagina, tamanho)
                        : await listarLivros(pagina, tamanho);

                    setLista(dados);
                    setTemMais(dados.length === tamanho && dados.length > 0);

                } catch (error) {
                    console.error("[HOOK] Erro ao buscar livros:", error);
                } finally {
                    setLoading(false);
                }
            };

            carregarLivros();

        }, 500);

        return () => clearTimeout(timeout);

    }, [busca, pagina, refresh]);

    return {
        busca,
        setBusca,
        lista,
        pagina,
        setPagina,
        loading,
        temMais,
    };
}