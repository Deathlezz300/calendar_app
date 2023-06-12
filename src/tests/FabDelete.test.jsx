/** @jest-environment jsdom */
import { fireEvent, render,screen } from "@testing-library/react";
import { FabDelete } from "../Calendar/components/FabDelete";
import { useCalendarStore } from "../Hooks/useCalendarStore";

jest.mock('../Hooks/useCalendarStore');


describe('Pruebas en <FabDelete/>',()=>{

    const mockStartDeletingEvent=jest.fn();
    
    beforeEach(()=>jest.clearAllMocks());

    test('Debe mostrar el componente correctamente',()=>{
        
        useCalendarStore.mockReturnValue({
            hasEventSelected:false,
        });
        
        render(<FabDelete/>);

        const btn=screen.getByLabelText('btn-delete');
        expect(btn.classList).toContain('btn');
        expect(btn.classList).toContain('btn-danger');
        expect(btn.classList).toContain('fab-danger');
        
    });

    test('Debe de mostrar el boton si hay un evento activo',()=>{
        useCalendarStore.mockReturnValue({
            hasEventSelected:true
        });
        
        render(<FabDelete/>);

        const btn=screen.getByLabelText('btn-delete');

        expect(btn.style.display).toBe('');
    });

    test('Debe de llamar onDeleteNote si hay un evento activo',()=>{
        useCalendarStore.mockReturnValue({
            hasEventSelected:true,
            activeEvent:{id:1},
            DeleteEvent:mockStartDeletingEvent
        });
        
        render(<FabDelete/>);

        const btn=screen.getByLabelText('btn-delete');

        fireEvent.click(btn);

        expect(mockStartDeletingEvent).toHaveBeenCalled();
    });

})