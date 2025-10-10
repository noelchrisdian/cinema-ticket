import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from '@/redux/features/filter/slice';
import { ticketReducer } from '@/redux/features/ticket/slice';

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        ticket: ticketReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;