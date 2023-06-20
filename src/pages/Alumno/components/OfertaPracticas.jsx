import { Alert, Grid, Typography ,Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button} from "@mui/material"
import {useQuery} from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import { useNavigate } from "react-router-dom";


const OfertasPracticas = ()=>{
    const navigate = useNavigate();
    const {data,status} = useQuery("ofertas",async()=>{
        const response = await clienteAxios.get("/oferta/getall");
        if(response.status==200){
            return response.data;
        }
    });
    
    if(status=="success" && data.ofertas){
        return (
            <Grid sx={{width:"90%",margin:"0px auto",display:"flex",flexDirection:"column"}} >
                <TableContainer component={Paper} sx={{ maxWidth: '90%',margin:"0px auto",marginTop:"10px", boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}>
                        <Table>
                        <TableHead sx={{ width: "100%", textAlign: "center" }}>
                        <TableRow>
                            <TableCell colSpan={2}>
                            <Typography variant="subtitle1" sx={{textAlign:"center", color: "black", transition: "all 1000ms", ':hover': { color: "black" } }}>Listado de ofertas de prácticas profesionales</Typography>
                            </TableCell>
                        </TableRow>
                        </TableHead>
                            <TableBody>
                                {
                                    data.ofertas.map((oferta,idx)=>(
                                        <TableRow key={idx} >
                                             <TableCell>
                                                 {oferta.descripcion}
                                             </TableCell>
                                             <TableCell>
                                                <Button variant="contained" onClick={()=>navigate(`/detalleoferta/${oferta.id_oferta_practica}`)} >Ver detalle</Button>
                                            </TableCell>
                                        </TableRow>
                                        
                                    ))
                                }                   
                            </TableBody>
                        </Table>
                    </TableContainer>
            </Grid>
        )    
    }
    if(status=="sucess" && !data.ofertas){
        <Grid sx={{display:"flex",flexDirection:"column"}} >
                <Alert>No hay ofertas publicadas</Alert>
        </Grid>
    }
    
}

export default OfertasPracticas;