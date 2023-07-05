import { CircularProgress, Grid } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import { useQuery } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import MisAptitudes from "../perfil-alumno/components/misApitudes";
import ModalAptitudes from "../perfil-alumno/components/ModalAptitudes";




const Aptitudes = ()=>{
    const rut = localStorage.getItem("rut");
    const id_alumno = localStorage.getItem("id_alumno")
        return(
            <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
                <HeaderAlumno/>
                <ModalAptitudes id_alumno={id_alumno} />
                <MisAptitudes id_alumno={id_alumno} />
                
            </Grid>
        )
    
    

  
    
}

export default Aptitudes;