import type { MovieDetailResponse } from "@/services/global/type";
import type { TheaterResponse } from "@/services/theaters/type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Ticket = {
    theater?: TheaterResponse,
    time?: string,
    seat?: string[]
}

export interface TicketState {
    step?: 'DETAILS' | 'THEATER' | 'TIME' | 'SEAT',
    detail?: Ticket | null,
    movie?: MovieDetailResponse | null
}

const initialState: TicketState = {
	step: "DETAILS",
	detail: null,
	movie: null,
}

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        setStep: (state, action: PayloadAction<TicketState>) => {
            state.step = action.payload.step
        },
        setTicketDetail: (state, action: PayloadAction<Ticket>) => {
            state.detail = {
                ...state.detail,
                ...action.payload
            }
        },
        setMovieDetail: (state, action: PayloadAction<MovieDetailResponse>) => {
            state.movie = {
                ...state.movie,
                ...action.payload
            }
        }
    }
})

export const { setStep, setTicketDetail, setMovieDetail } = ticketSlice.actions;
export const ticketReducer = ticketSlice.reducer;