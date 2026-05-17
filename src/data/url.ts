export const APP_URL = {
    LOGIN: "/login",
    RAW_MATERIAL: "/raw-material"
}

export const API_URL = {
    AUTH: {
        INDEX: "/auth/login"
    },
    CATEGORIES: {
        INDEX: "/categories"
    },
    RAW_MATERIAL: {
        INDEX: "/raw-materials",
        DETAIL: "/raw-materials/:id",
        STOCKIN: "/raw-materials/:id/stock-in",
        STOCKOUT: "/raw-materials/:id/stock-out",
        STOCKOPNAME: "/raw-materials/:id/stock-opname",
    }
}