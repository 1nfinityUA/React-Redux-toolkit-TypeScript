

export enum SortPropertyEnum {
    RAITING_DESC = 'raiting',
    RAITING_ASC = '-raiting',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
}

export type SortPopup = {
    name: string;
    sortProperty: SortPropertyEnum;
}

export interface FilterSliceState {
    categoryId: number;
    currentPage: number;
    searchValue: string;
    sort: SortPopup;
}