import { Alert, Button, Grid, Typography } from "@mui/material";
import { useQuery } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import { useNavigate } from "react-router-dom";




const ComprobarInscripcion = ()=>{
    
    const id_alumno = localStorage.getItem("id_alumno");
    const id_inscribe = localStorage.getItem("id_inscribe");
    const navigate = useNavigate();
    const {data,status} = useQuery("estado_inscripcion",async()=>{
        const response = await clienteAxios.post("/inscripcion/comprobar",{
            id_alumno:id_alumno
        }) 
        return response.data;
    });

    if(status=="success" && data.inscrito_sistema){
     
        return(
            <Grid sx={{width:"90%",margin:"0px auto",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                <Alert >Práctica inscrita en el sistema</Alert>
                <Button sx={{marginLeft:"5px"}} variant="contained" onClick={()=>navigate(`/detalleinscripcion/${id_inscribe}`)} >Ver Inscripción</Button>
    
            </Grid>
        )
    }
    if(status=="success" && data.inscrito_sistema==false){
     
        return(
            <Grid sx={{width:"90%",margin:"0px auto",display:"flex",justifyContent:"center",marginTop:"10px"}}>
                <Alert severity="warning" >No estas inscrito en el sistema</Alert>
                <Button sx={{marginLeft:"5px"}} variant="contained" onClick={()=>navigate(`/detalleinscripcion/5`)} >Inscribir aquí</Button>
    
            </Grid>
        )
    }


  
}


export default ComprobarInscripcion;