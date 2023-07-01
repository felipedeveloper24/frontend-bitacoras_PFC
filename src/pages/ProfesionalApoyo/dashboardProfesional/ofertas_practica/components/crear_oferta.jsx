import { Grid, Typography } from "@mui/material";
import HeaderProfesional from "../../../../../components/headers/headerProfesional";
import FormularioIngresar from "./FormularioIngresar";



const CrearOferta = ()=>{

    return(
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <HeaderProfesional/>
            <Typography variant="h6" sx={{textAlign:"center",marginTop:"10px",marginBottom:"10px"}}>
                Crear oferta de práctica
            </Typography>
            <FormularioIngresar/>
        </Grid>
    )
}


export default CrearOferta;