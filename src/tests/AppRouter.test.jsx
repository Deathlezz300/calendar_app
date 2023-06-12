/** @jest-environment jsdom */
import { render,screen } from "@testing-library/react";
import { AppRouter } from "../Router/AppRouter"
import { useAuthStore } from "../Hooks/useAuthStore";
import { MemoryRouter } from "react-router-dom";


jest.mock('../Hooks/useAuthStore');

jest.mock('../Calendar/Pages/CalendarPage',()=>({
    CalendarPage:()=><h1>CalendarPage</h1>
}));

describe('Pruebas en el componente <AppRouter/>',()=>{

    const mockStartCheckAuth=jest.fn();

    test('Debe de mostrar la pantalla de carga y debe llamar checkAuthToken',()=>{
    
        useAuthStore.mockReturnValue({
            status:'checking',
            checkAuthToken:mockStartCheckAuth
        });
        
        render(<AppRouter/>);

        expect(mockStartCheckAuth).toHaveBeenCalled();

    });

    test('Debe mostrar el login en caso de no estar autenticado',()=>{
        useAuthStore.mockReturnValue({
            status:'not-authenticated',
            checkAuthToken:mockStartCheckAuth
        });
        
        const {container}=render(<MemoryRouter>
            <AppRouter/>
        </MemoryRouter>);

        expect(screen.getByText('Ingreso')).toBeTruthy();
        expect(container).toMatchSnapshot();

    });

    test('Debe mostrar el calendario si estamos autenticados',()=>{
        useAuthStore.mockReturnValue({
            status:'authenticated',
            checkAuthToken:mockStartCheckAuth
        });
        
        render(<MemoryRouter>
            <AppRouter/>
        </MemoryRouter>);

        expect(screen.getByText('CalendarPage')).toBeTruthy();

    });

})