import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortPropertyEnum, FilterSliceState, SortPopup } from './types';


const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
  sort: {
    name: "популярности",
    sortProperty: SortPropertyEnum.RAITING_DESC,
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>){
        state.categoryId = action.payload
    },
    setSort(state, action: PayloadAction<SortPopup>){
        state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>){
        state.currentPage = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>){
        state.searchValue = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>){
        if (Object.keys(action.payload).length){
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
            state.categoryId = Number(action.payload.categoryId);
        } else {
            state.currentPage = 1;
            state.categoryId = 0;
            state.sort = {
                name : 'популярності',
                sortProperty: SortPropertyEnum.RAITING_DESC
            }
        }
    }
  },
})
export const {setCategoryId, setSort, setSearchValue, setCurrentPage, setFilters} = filterSlice.actions
export default filterSlice.reducer