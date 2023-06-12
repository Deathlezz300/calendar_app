import { renderHook } from "@testing-library/react";
import { useUIModal } from "../Hooks/useUIModal";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "../store/Calendar/uiSlice";
import { act } from "react-dom/test-utils";

//Se crear un mock para poder trabajar el store como se queira
const getMockStore=(initialState)=>{
    return configureStore({
        reducer:{
            ui:uiSlice.reducer
        },
        preloadedState:{
            ui:{...initialState}
        }
    })
}

describe('Pruebas en useModal',()=>{
    test('Debe regresar los valores por defecto',()=>{
        //Con esto se renderiza el customHook y con
        //wrapper se le pasa el contexto en caso de usarlo

        const mockStore=getMockStore({showModal:false});

        const {result}=renderHook(()=>useUIModal(),{
            wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
        });


        expect(result.current).toEqual({
            showModal:false,
            onToogleModal:expect.any(Function)
        });

    });

    test('Debe colocar el showModal en true o Open',()=>{
        const mockStore=getMockStore({showModal:false});

        const {result}=renderHook(()=>useUIModal(),{
            wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
        });

        const {onToogleModal}=result.current;

        //Esto nos permite disparar funciones o acciones de un
        //Hook personalizado envolviendo la funcion en el contexto necesario
        act(()=>{
            onToogleModal();
        });

        expect(result.current.showModal).toBeTruthy();

    });

    test('Debe cambiar el showModal a false o cerrarlo',()=>{
        const mockStore=getMockStore({showModal:true});

        const {result}=renderHook(()=>useUIModal(),{
            wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
        });

        const {onToogleModal}=result.current;

        //Esto nos permite disparar funciones o acciones de un
        //Hook personalizado envolviendo la funcion en el contexto necesario
        act(()=>{
            onToogleModal();
        });

        expect(result.current.showModal).toBeFalsy();

    });

})