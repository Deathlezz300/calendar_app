/** @jest-environment jsdom */
import { ChangeModal, CloseModal, uiSlice } from "../../../store/Calendar/uiSlice";

describe('Pruebas en UiSlice',()=>{
    test('Debe regresar el estado por defecto',()=>{
        expect(uiSlice.getInitialState().showModal).toBeFalsy();
    });

    test('Debe cambiar el showModal correctamente',()=>{
        let state=uiSlice.getInitialState();
        state=uiSlice.reducer(state,ChangeModal());
        expect(state.showModal).toBeTruthy();

        state=uiSlice.reducer(state,CloseModal());
        expect(state.showModal).toBeFalsy();
    });

});