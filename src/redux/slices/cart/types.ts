
export type CartItemType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
}
// то саме шо тайп тільки може тіпізірувати обєкти і все
export interface CartSliseState {
    totalPrice: number;
    items: CartItemType[];
}