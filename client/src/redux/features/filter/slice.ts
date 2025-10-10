import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
    availability?: boolean;
    city?: string;
    genre?: string;
    theaters?: string[];
}

const initialState: FilterState = {
	availability: undefined,
	city: undefined,
	genre: undefined,
	theaters: undefined,
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<Partial<FilterState>>) => {
            state.availability = action.payload.availability ?? state.availability
            state.city = action.payload.city ?? state.city
            state.genre = action.payload.genre ?? state.genre
            state.theaters = action.payload.theaters ?? state.theaters
        }
    }
})

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;