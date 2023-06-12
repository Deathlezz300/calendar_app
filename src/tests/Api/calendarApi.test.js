/** @jest-environment jsdom */
import calendarApi from "../../Api/CalendarApi";
import { getEnvVariables } from "../../helpers/getEnvVariables";

describe('Pruebas en el calendarApi',()=>{

    const {VITE_API_URL}=getEnvVariables();

    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDg0ODc2NTZhZDI5MDRiNmIzMDFiZmEiLCJuYW1lIjoiVGVzdCBVc2VyIiwiaWF0IjoxNjg2NDA3MDEzLCJleHAiOjE2ODY0MTQyMTN9.ukn-VT-nIIEXeWpxUGXINe7DR5fngrtMtfa8DodAjWE';

    test('Debe de tener la configuración por defect',()=>{
        
        expect(calendarApi.defaults.baseURL).toBe(VITE_API_URL);


    });


    test('Debe de tener el x-token en el header de todas las peticiones',async()=>{
        localStorage.setItem('token',token);
        const res=await calendarApi.get('/eventos/');
        
        expect(res.config.headers['x-token']).toBe(token);
    })

});