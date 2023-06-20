import { CircularProgress, Grid, Typography } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import DatosPersonales from "./components/datosPersonales";
import MisAptitudes from "./components/misApitudes";
import { useQuery } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import ModalAptitudes from "./components/ModalAptitudes";

const PerfilAlumno = ()=>{

    const rut = localStorage.getItem("rut");
    const {data,status} = useQuery("datospersonales", async()=>{
        const response = await clienteAxios.post("/alumno/show",{
            rut:rut
        })
        return response.data.alumno
    });
    if(status=="success"){
     
        return (
            <Grid sx={{
                width:"100%",
                display:"flex",
                flexDirection:"column"
            }}>
                <HeaderAlumno  />
                 <DatosPersonales data={data}/>
                 <ModalAptitudes id_alumno={data.id_alumno} />
                 <MisAptitudes id_alumno={data.id_alumno}/>
                
            </Grid>
        )
    }
    if(status=="loading"){
        return (
            <Grid sx={{width:"30%",margin:"0px auto"}}>
                Cargando datos.........
                <CircularProgress/>
            </Grid>
        )
    }
   
}

export default PerfilAlumno;