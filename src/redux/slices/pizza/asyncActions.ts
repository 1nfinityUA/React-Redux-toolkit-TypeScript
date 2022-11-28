import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";

export const fetchPIzzas = createAsyncThunk(
    "pizza/fetchPIzzasStatus",
    async (params: SearchPizzaParams) => {
        const { order, sortBy, category, currentPage, search } = params;
        const { data } = await axios.get<Pizza[]>(
            `https://63555930483f5d2df3b29481.mockapi.io/items-2?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&${search}`
        );
        return data as Pizza[];
    }
);
