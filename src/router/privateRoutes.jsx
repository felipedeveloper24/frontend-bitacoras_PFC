import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DashboardAlumno from "../pages/Alumno/Dashboard";
import DashboardJefeCarrera from "../pages/JefeDeCarrera/dashboardJefe/DashboardJefeCarrera";
import DashboardProfesional from "../pages/ProfesionalApoyo/dashboardProfesional/DashboardProfesional";
import ModificarEmpresa from "../pages/ProfesionalApoyo/dashboardProfesional/empresas/modificar_empresa";
import PerfilAlumno from "../pages/Alumno/perfil-alumno/PerfilAlumno";
import DetalleOfertaPractica from "../pages/Alumno/detalleofertapractica/detalleofertapractica";
import DetalleInscripcion from "../pages/Alumno/detalleInscripcion/DetalleInscripcion";


const PrivateRoutes = ()=>{

    const {user} = useContext(AuthContext)

    const rol = localStorage.getItem("rol");
    
    
    if(rol && rol == 1 ){
        return (
            <Routes>
                <Route path="/dashboard" element={<DashboardAlumno/>} />  
                <Route path="/perfil" element={<PerfilAlumno/>} />
                <Route path="/detalleoferta/:id" element={<DetalleOfertaPractica/>} />
                <Route path="/detalleinscripcion/:id" element={<DetalleInscripcion/>}/>
            </Routes>
        )
    }
    if(rol && rol == 2){
        return (
            <Routes>
                <Route path="/dashboard" element={<DashboardJefeCarrera/>} />
            </Routes>
        )
    }
    if(rol && rol == 3){
        return (
            <Routes>
                <Route path="/dashboard" element={<DashboardProfesional/>} />
                <Route path="/modificarEmpresa/:id" element={<ModificarEmpresa/>} />
           
            </Routes>
        )
    }

};


export default PrivateRoutes;