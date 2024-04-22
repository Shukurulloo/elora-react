 // prodact enum valulari
export enum ProductSize {  
    SMALL = "SMALL",
    NORMAL = "NORMAL",
    LARGE = "LARGE",
    SET = "SET"
}

export enum ProductVolume {
    HALF = 0.5,
    ONE = 1,
    ONE_POINT_TWO = 1.2,
    ONE_POINT_FIVE = 1.5,
    TWO = 2,
}

export enum ProductStatus { // databacedan o'chib ketmaydi statusi o'zgaradi
    PAUSE = "PAUSE",
    PROCESS = "PROCESS", // savdodagi
    DELETE = "DELETE",
}

export enum ProductCollection {
    DISH = "DISH",
    SALAD = "SALAD",
    DESSERT = "DESERT",
    DRINK = "DRINK",
    OTHER = "OTHER",
}