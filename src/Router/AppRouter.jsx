import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/Pages/LoginPage";
import { CalendarPage } from "../Calendar/Pages/CalendarPage";


export const AppRouter = () => {

  const authStatus='authenticated';

  return (
    <Routes>
        {
            authStatus==='not_authenticated' ? <Route path="auth/*" element={<LoginPage/>}/>
            :<Route path="/*" element={<CalendarPage/>}/>
        }

        <Route path="/*" element={<Navigate to='/auth/login'/>}/>
        
    </Routes>
  )
}
