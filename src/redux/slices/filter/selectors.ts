import { RootState } from "../../store";

// селектор для витягування данних з юзСелектор (для зручності)
export const selectSort = (state: RootState) => state.filter.sort