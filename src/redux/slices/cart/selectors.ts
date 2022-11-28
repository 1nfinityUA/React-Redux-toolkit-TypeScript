import { RootState } from "../../store";


// селектор для того щоб витягати данні з юзСелектор
export const selectCart = (state: RootState) => state.cart;
// селектор який получає ІД і вертає функцію яка зрівнює цей ід з ід обєкта + витягує данні з юзСелектор
export const selectCartItemById = (id: string) => (state: RootState) =>
    state.cart.items.find((obj) => obj.id === id);