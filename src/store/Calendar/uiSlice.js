import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
     showModal:false
    },
    reducers: {
        ChangeModal:(state)=>{
            state.showModal=true;
        },
        CloseModal:(state)=>{
            state.showModal=false;
        }
    }
});


// Action creators are generated for each case reducer function
export const { ChangeModal,CloseModal } = uiSlice.actions;