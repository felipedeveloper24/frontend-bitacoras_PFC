import { Card, CircularProgress, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import { useQuery } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import { useParams } from "react-router-dom";



const DetalleOfertaPractica = ()=>{
    const {id} = useParams();
    const getOferta = useQuery("detalleoferta",async()=>{
        const response = await clienteAxios.get(`/oferta/show/${id}`);
        return response.data;
    });
    if(getOferta.status=="success"){
        return(
            <Grid sx={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <HeaderAlumno/>
                
                {
                    getOferta.status=="success" && getOferta.data.oferta &&
                    <Card sx={{width:"80%",padding:"40px"}}>
                        <Typography sx={{textAlign:"center"}} variant="h5">Detalle oferta</Typography>
                        <Card sx={{padding:"30px"}}>
                             <Typography sx={{marginBottom:"10px",fontFamily:"cursive"}}> Descripción: {getOferta.data.oferta.descripcion}</Typography>
                             <cite style={{fontFamily:"cursive"}}>Empresa: {getOferta.data.oferta.empresa.razon_social} </cite>
                             <br />
                             <cite style={{fontFamily:"cursive"}}>Correo: {getOferta.data.oferta.empresa.correo} </cite>
                             <br/>
                             <cite style={{fontFamily:"cursive"}}>Teléfono: {getOferta.data.oferta.empresa.telefono} </cite>
                        </Card>
                        <Card sx={{padding:"30px",marginTop:"10px"}}>
                            <Typography sx={{fontFamily:"cursive"}} >Condiciones:</Typography>
                            <List>
                                <ListItem>
                                    <ListItemText>Modalidad: {getOferta.data.oferta.modalidad.nombre_modalidad} </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>Experiencia laboral: {getOferta.data.oferta.experiencia_laboral == true ? "Si" : "No"} </ListItemText>
                                </ListItem>
                            </List>
                        </Card>
                        
    
                    </Card>
                }
                
            </Grid>
        );
    }
    if(getOferta.status=="loading"){
        <Grid sx={{width:"35%",margin:"0px auto",marginTop:"20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            Cargando datos.........
            <CircularProgress/>
            
        </Grid>
    }
  
}

export default DetalleOfertaPractica;