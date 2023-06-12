import { Onchecking, authSlice, clearErrorMessage, onLogOut, onLogin } from "../../../store/Auth/AuthSlice";
import { AuthenticatedState, initialState, notAuthenticatedState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe('Pruebas en authSlice',()=>{
    test('Debe regresar el estado inicial',()=>{
        expect(authSlice.getInitialState()).toEqual(initialState);
    });

    test('Debe realizar un login',()=>{
        const state=authSlice.reducer(initialState,onLogin(testUserCredentials));
        expect(state).toEqual({
            status:'authenticated',
            errorMessage:undefined,
            user:testUserCredentials
        });
    });

    test('Debe de realizar el LogOut',()=>{
        const state=authSlice.reducer(AuthenticatedState,onLogOut());
        expect(state).toEqual({
            status:'not-authenticated',
            errorMessage:undefined,
            user:{}
        })
    });

    test('Debe de limpiar el mensade de error',()=>{
        const errorMessage='Credenciales No validas'
        const state=authSlice.reducer(AuthenticatedState,onLogOut(errorMessage));
        const newState=authSlice.reducer(state,clearErrorMessage());
        expect(newState.errorMessage).toBe(undefined);
    });

    test('Debe cambiar el status a checking',()=>{
        const state=authSlice.reducer(notAuthenticatedState,Onchecking());
        expect(state.status).toBe('checking');
    })

});