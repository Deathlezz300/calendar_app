import { useDispatch,useSelector } from "react-redux"
import calendarApi from "../Api/CalendarApi";
import { Onchecking, clearErrorMessage, onLogOut, onLogin } from "../store/Auth/AuthSlice";


export const useAuthStore=()=>{

    const {status,user,errorMessage}=useSelector(state=>state.auth);

    const dispatch=useDispatch();

    const startLogin=async({email,password})=>{
        dispatch(Onchecking());
        try{
            //Se extrae la variable data de la peticion con axios
            //luego se setea en el local storage el token y el tiempo del mismo
            const {data}=await calendarApi.post('/auth',{email,password});
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date',new Date().getTime());
            if(data.ok){
                return dispatch(onLogin({
                    uid:data.uid,
                    name:data.name,
                }));
            } 
        }catch(error){
            console.log(error);
            dispatch(onLogOut('Credenciales incorrectas'));
            setTimeout(()=>{
                dispatch(clearErrorMessage())
            },10)
        }
    }

    return {
        status,
        user,
        errorMessage,
        startLogin
    }

}