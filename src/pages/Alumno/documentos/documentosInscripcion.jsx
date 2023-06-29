import { Grid } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";




const DocumentosInscripcion = ()=>{
    return (
        <Grid sx={{
            width:"100%",
            display:"flex",
            flexDirection:"column"
        }}>
            <HeaderAlumno/>

        </Grid>
    )
}


export default DocumentosInscripcion;