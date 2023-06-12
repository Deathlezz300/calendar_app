import { useAuthStore } from "../Hooks/useAuthStore";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../store/Auth/AuthSlice";
import { AuthenticatedState, initialState, notAuthenticatedState } from "./fixtures/authStates";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";

const getMockStore=(initialState)=>{
    return configureStore({
        reducer:{
            auth:authSlice.reducer
        },
        preloadedState:{
            auth:{...initialState}
        }
    })
}

describe('Pruebas en el Hook useAuthStore',()=>{
    test('Debe de regresar los valores por defecto',()=>{
        const mockStore=getMockStore({...initialState});

        const {result}=renderHook(()=>useAuthStore(),{
            wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            LogOut: expect.any(Function)
        });

    });

    test('Debe rechazar el login',async()=>{

        localStorage.clear();

        const mockStore=getMockStore({...notAuthenticatedState});

        const {result}=renderHook(()=>useAuthStore(),{
            wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
        });

        await act(async()=>{
            await result.current.startLogin({email:'sapo@google.com',password:'noclave12345'});
        });
        
        const {status,errorMessage,user}=result.current;
        expect({status,user,errorMessage}).toEqual({
            status:'not-authenticated',
            user:{},
            errorMessage:expect.any(String)
        });
        expect(localStorage.getItem('token')).toBe(null);
    });

    test('Debe realizar el login correctamente',async()=>{
        
        localStorage.clear();

        const mockStore=getMockStore({...notAuthenticatedState});

        const {result}=renderHook(()=>useAuthStore(),{
            wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
        });

        await act(async()=>{
            await result.current.startLogin({email:'test@google.com',password:'123456'});
        });

        expect(result.current.status).toBe('authenticated');
        expect(localStorage.getItem('token')).toEqual(expect.any(String));

    });


    test('Debe de renovar el token',async()=>{
        const mockStore=getMockStore({...notAuthenticatedState});

        const {result}=renderHook(()=>useAuthStore(),{
            wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
        });

        await act(async()=>{
            await result.current.checkAuthToken();
        })

        expect(result.current.status).toBe('authenticated');
        expect(localStorage.getItem('token')).toEqual(expect.any(String));

    });

    test('Debe crear una cuenta correctamente',async()=>{
        localStorage.clear();

        const mockStore=getMockStore({...notAuthenticatedState});

        const {result}=renderHook(()=>useAuthStore(),{
            wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
        });

        await act(async()=>{
            await result.current.startRegister({name:'EsternoCleido',email:'prueba@google.com',password:'prueba12345'});
        });

        expect(result.current.status).toBe('authenticated');
        expect(localStorage.getItem('token')).toEqual(expect.any(String));

    });

    test('Debe fallar al crear una cuenta',async()=>{
        localStorage.clear();

        const mockStore=getMockStore({...notAuthenticatedState});

        const {result}=renderHook(()=>useAuthStore(),{
            wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
        });

        await act(async()=>{
            await result.current.startRegister({name:'vegeta500',email:'prueba@google.com',password:'1234567'});
        });

        const {status,errorMessage,user}=result.current;
        expect({status,errorMessage,user}).toEqual({
            user:{},
            errorMessage:expect.any(String),
            status:'not-authenticated'
        });
        expect(localStorage.getItem('token')).toBe(null);

    })


    test('Debe cerrar sesion correctamente',()=>{
        const mockStore=getMockStore({...AuthenticatedState});

        const {result}=renderHook(()=>useAuthStore(),{
            wrapper:({children})=><Provider store={mockStore}>{children}</Provider>
        });

        act(()=>{
            result.current.LogOut();
        })

        const {status,errorMessage,user}=result.current;
        expect({status,user,errorMessage}).toEqual({
            user:{},
            status:'not-authenticated',
            errorMessage:undefined
        });
        expect(localStorage.getItem('token')).toBe(null);

    })

});
