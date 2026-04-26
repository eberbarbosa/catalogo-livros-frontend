const isDev = typeof import.meta !== "undefined"
    ? import.meta.env?.MODE === "development"
    : true;

export const logger = {
    info: (context, message, data) => {
        if (isDev) {
            console.log(`[${context}] ${message}`, data || "");
        }
    },

    error: (context, message, error) => {
        console.error(`[${context}] ❌ ${message}`, error);
    },

    warn: (context, message, data) => {
        if (isDev) {
            console.warn(`[${context}] ⚠️ ${message}`, data || "");
        }
    }
};