import { Card, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import { useQuery } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import { useParams } from "react-router-dom";



const DetalleOfertaPractica = ()=>{
    const {id} = useParams();
    const getOferta = useQuery("detalleoferta",async()=>{
        const response = await clienteAxios.get(`/oferta/show/${id}`);
        console.log(response.data);
        return response.data;
    });
    return(
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <HeaderAlumno/>
            <Typography sx={{textAlign:"center",marginTop:"15px"}} variant="h5">Detalle oferta</Typography>
            {
                getOferta.status=="success" && getOferta.data.oferta &&
                <Card sx={{width:"80%",padding:"40px"}}>
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

export default DetalleOfertaPractica;