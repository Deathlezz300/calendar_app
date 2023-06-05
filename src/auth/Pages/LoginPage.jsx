import Swal from 'sweetalert2'
import { useAuthStore } from '../../Hooks/useAuthStore'
import { useForm } from '../../Hooks/useForm'
import '../../assets/css/Login.css'
import { useEffect } from 'react'

const LoginFormFields={
    loginEmail:'',
    loginPassword:''
}

const RegisterFormFields={
    RegisterName:'',
    RegisterEmail:'',
    RegisterPassword:'',
    RegisterRepeatPassword:''
}


export const LoginPage = () => {

    //Se renombra el metodo onInputChange para no generar conflictos
    const {loginEmail,loginPassword,onInputChange:onLoginChange}=useForm(LoginFormFields,{});

    const {RegisterName,RegisterEmail,RegisterPassword,RegisterRepeatPassword
        ,onInputChange:onRegisterChange}=useForm(RegisterFormFields,{});

    const {startLogin,errorMessage}=useAuthStore();

    const onLoginSumbit=(evento)=>{
        evento.preventDefault();
        startLogin({email:loginEmail,password:loginPassword});
    }

    const onRegisterSubmit=(evento)=>{
        evento.preventDefault();
    }

    useEffect(()=>{
        if(errorMessage!==undefined){
            Swal.fire('Error en la autenticación',errorMessage,'error');
        }
    },[errorMessage])

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                                onClick={onLoginSumbit}
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='RegisterName'
                                value={RegisterName}
                                onChange={onRegisterChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                value={RegisterEmail}
                                name='RegisterEmail'
                                onChange={onRegisterChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                value={RegisterPassword}
                                name='RegisterPassword'
                                onChange={onRegisterChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                value={RegisterRepeatPassword}
                                name='RegisterRepeatPassword'
                                onChange={onRegisterChange} 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit"
                                onClick={onRegisterSubmit} 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}