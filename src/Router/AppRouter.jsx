import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/Pages/LoginPage";
import { CalendarPage } from "../Calendar/Pages/CalendarPage";
import { useAuthStore } from "../Hooks/useAuthStore";
import { useEffect } from "react";
import { Loader } from "../Calendar/components/Loader";

export const AppRouter = () => {

  const {status,checkAuthToken}=useAuthStore();


  useEffect(()=>{
    checkAuthToken();
  },[]);

  if(status==='checking'){
    return <Loader/>
  }

  return (
    <Routes>
        {
            status==='not-authenticated' ? 
            (
              <>
                <Route path="auth/*" element={<LoginPage/>}/>
                <Route path="/*" element={<Navigate to='/auth/login'/>}/>
              </>
            )
            :
            (
              <>
                <Route path="/" element={<CalendarPage/>}/>
                <Route path="/*" element={<Navigate to='/'/>}/>
              </>
            )
        }
        
    </Routes>
  )
}
