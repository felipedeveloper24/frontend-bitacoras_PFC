import { Grid, Typography } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import FormularioInscripcion from "./formularioInscripcion";



const InscripcionPractica = ()=>{

    return (
        <Grid sx={{width:"100%", display:"flex", flexDirection:"column"}}>
            <HeaderAlumno/>
            <Typography variant="h5" style={{textAlign:"center",marginTop:"15px",marginBottom:"15px"}} >Inscripción de práctica</Typography>
            
            <FormularioInscripcion/>
        </Grid>
    )
}

export default InscripcionPractica;
