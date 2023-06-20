import { createContext, useState } from "react";

import clienteAxios from "../helpers/clienteaxios";
import { setToken } from "../helpers/tokenUtilities";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const navigate = useNavigate();
    const [user,setUser] = useState(null);

    const login = async (rut,password)=>{
        try{
            const response = await clienteAxios.post("/auth/login",{rut,contrasena:password});
            if(response.status==200){
                console.log(response.data);
                switch(response.data.rol){
                    case 1:{
                        const userData = response.data;
                        setToken(response.data.token);
                       
                        localStorage.setItem("rol",response.data.rol);
                        localStorage.setItem("rut",response.data.alumno.rut);
                        localStorage.setItem("id_alumno",response.data.alumno.id_alumno)
                        localStorage.setItem("id_inscribe",response.data.id_inscribe)
                        setUser(userData);
                        
                        Swal.fire(
                            'Iniciando sesión',
                            'Redireccionando .......',
                            'success'
                          )
                        setTimeout(()=>{
                            Swal.close()
                            navigate("/dashboard")
                        },3000)
                        break;
                    }
                    case 2:{
                        const userData = response.data;
                        setToken(response.data.token);
                        localStorage.setItem("rol",response.data.rol);
                        setUser(userData);
                        Swal.fire(
                            'Iniciando sesión',
                            'Redireccionando .......',
                            'success'
                          )
                        setTimeout(()=>{
                            navigate("/dashboard")
                        },3000)
                        break;
                    }
                    case 3:{
                        const userData = response.data;
                        setToken(response.data.token);
                        localStorage.setItem("rol",response.data.rol);
                        localStorage.setItem("rut",response.data.rut);
                        setUser(userData);
                        Swal.fire(
                            'Iniciando sesión',
                            'Redireccionando .......',
                            'success'
                          )
                        setTimeout(()=>{
                            navigate("/dashboard")
                        },3000)
                        break;
                    }
                    
                }
            }
          
        }catch(error){
            console.log(error);
        }
    }
    const logout = ()=>{
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user,login,logout}} >
            {children}
        </AuthContext.Provider>
    )
   
}

export {AuthContext,AuthProvider};