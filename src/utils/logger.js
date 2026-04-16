export const log = (tag, message, data = null) => {
    console.log(`[${tag}] ${message}`, data || "");
};

export const error = (tag, message, err) => {
    console.error(`[${tag}] ${message}`, err);
};