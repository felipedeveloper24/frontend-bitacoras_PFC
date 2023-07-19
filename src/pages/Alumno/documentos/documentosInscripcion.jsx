import { Grid, Typography } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import { useParams } from "react-router-dom";
import MostrarArchivos from "./components/mostrar_archivos";
import SubirArchivo from "./components/subirarchivo";




const DocumentosInscripcion = ()=>{
    const {id} = useParams();
    
    return (
        <Grid sx={{
            width:"100%",
            display:"flex",
            flexDirection:"column"
        }}>
            <HeaderAlumno/>
            
            <SubirArchivo id={id}/>
            <MostrarArchivos id={id}/>
            
        </Grid>
    )
}


export default DocumentosInscripcion;