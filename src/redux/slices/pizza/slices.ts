import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchPIzzas } from "./asyncActions";
import { Pizza, PizzaSliceState, Status } from "./types";


const initialState: PizzaSliceState = {
    items2: [],
    status: Status.LOADING,
};

export const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items2 = action.payload;
        },
    },
    // ця логіка для асинхронного екшену який може давати статус проміса
    // і можна обійтись без трай-кеч
    extraReducers: (builder) => {
        builder.addCase(fetchPIzzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items2 = [];
        });
        builder.addCase(fetchPIzzas.fulfilled, (state, action) => {
            state.items2 = action.payload;
            state.status = Status.SUCCSESS;
        });
        builder.addCase(fetchPIzzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items2 = [];
        });
    },
});
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
