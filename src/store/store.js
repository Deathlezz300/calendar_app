import { configureStore} from "@reduxjs/toolkit";
import { uiSlice } from "./Calendar/uiSlice";
import { CalendarSlice } from "./Calendar/CalendarSlice";

export const store=configureStore({
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}),
    reducer:{
        ui:uiSlice.reducer,
        calendar:CalendarSlice.reducer
    }
});