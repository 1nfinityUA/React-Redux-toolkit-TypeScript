export type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
};

export enum Status {
    LOADING = "loading",
    SUCCSESS = "succsess",
    ERROR = "error",
}

export interface PizzaSliceState {
    items2: Pizza[];
    status: Status;
}

export type SearchPizzaParams = {
    order: string;
    sortBy: string;
    category: string;
    currentPage: string;
    search: string;
};