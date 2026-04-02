import { toast } from "react-toastify";

export const toastSucesso = (mensagem) => {
    toast.success(mensagem, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark"
    });
};

export const toastErro = (mensagem) => {
    toast.error(mensagem, {
        position: "top-right",
        autoClose: 4000,
        theme: "dark"
    });
};