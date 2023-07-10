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
import InscripcionPractica from "../pages/Alumno/inscripcion_practica/inscripcionPractica";
import ModificarDatos from "../pages/Alumno/inscripcion_practica/modificarDatos";
import DocumentosInscripcion from "../pages/Alumno/documentos/documentosInscripcion";
import OfertaPractica from "../pages/ProfesionalApoyo/dashboardProfesional/ofertas_practica/ofertapractica";
import CrearOferta from "../pages/ProfesionalApoyo/dashboardProfesional/ofertas_practica/components/crear_oferta";
import ModificarOferta from "../pages/ProfesionalApoyo/dashboardProfesional/ofertas_practica/components/modificarOferta";
import ArchivosBitacoras from "../pages/Alumno/archivos_bitacora/Archivos_bitacoras";
import ImagenesBitacoras from "../pages/Alumno/imagenesBitacora/imageneBitacoras";
import Aptitudes from "../pages/Alumno/aptitudes/aptitudes";
import Empresas from "../pages/ProfesionalApoyo/dashboardProfesional/empresas";
import EstadoPracticas from "../pages/ProfesionalApoyo/dashboardProfesional/estado_practicas/estado_practicas";
import InformacionGeneral from "../pages/ProfesionalApoyo/dashboardProfesional/estado_practicas/informacion_general_practica";
import VerDocumentosInscripcion from "../pages/ProfesionalApoyo/dashboardProfesional/estado_practicas/verdocumentosinscripcion";


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
                <Route path="/inscripcionpractica/:id" element={<InscripcionPractica/>} />
                <Route path="/modificarinscripcion/:id" element={<ModificarDatos/>} />
                <Route path="/documentosinscripcion/:id" element={<DocumentosInscripcion/>} />
                <Route path="/archivosbitacora/:id" element ={<ArchivosBitacoras/>} />
                <Route path="/imagenesbitacora/:id" element={<ImagenesBitacoras/>} />
                <Route path="/aptitudes" element={<Aptitudes/>} />
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
                <Route path="/empresas" element={<Empresas/>} />
                <Route path="/modificarEmpresa/:id" element={<ModificarEmpresa/>} />
                <Route path="/ofertapracticas" element={<OfertaPractica/>} />
                <Route path="/crearoferta" element={<CrearOferta/>} />
                <Route path="/modificaroferta/:id" element={<ModificarOferta/>} />
                <Route path="/estadopracticas/:anio/:periodo/:asignatura/:carrera" element={<EstadoPracticas/>}/>
                <Route path="/informaciongeneral/:inscribe" element={<InformacionGeneral/>} />
                <Route path="/documentosinscripcion/:id" element={<VerDocumentosInscripcion/>} />
            </Routes>
        )
    }

};


export default PrivateRoutes;