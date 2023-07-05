import { CircularProgress, Grid, Typography,Box ,Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Tooltip, Alert} from "@mui/material"
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const MisAptitudes = ({id_alumno})=>{
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true)

    const getApitudes = async()=>{
        const response = await clienteAxios.post("/alumno/showAptitudes",{
            id_alumno:id_alumno
        });
        if(response.status==200){
            setData(response.data);
            setLoading(!loading);
        }
    }
    useEffect(()=>{
        getApitudes()
    },[])

    const eliminar_conocimiento = async(id_conocimiento)=>{
        
        const response = await clienteAxios.delete(`/conocimiento/delete/${id_conocimiento}`);
        if(response.status==200){
            Swal.fire({
                title:"Eliminado",
                text:"Conocimento eliminado correctamente",
                icon:"success",
                confirmButtonText:"Aceptar"
            })
            setTimeout(()=>{
                window.location.reload();
            },2000)
        }
    }

    if(!loading && data.aptitudes ){
        return (
            <Grid>
                  <Box sx={{ display: 'flex', flexDirection: 'column',alignItems:"center", minHeight: '100vh' }}>
                        <Typography variant="h4" component="h1" gutterBottom sx={{ color: "black", transition: "all 1000ms",marginTop:"30px", ':hover': { color: "orange" } }}>
                            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                <PsychologyAltRoundedIcon sx={{ fontSize: "3rem", mr: 2 }} />
                                Aptitudes del alumno
                                <PsychologyAltRoundedIcon sx={{ fontSize: "3rem", ml: 2 }} />
                            </Box>
                        </Typography>
                   
                    <TableContainer component={Paper} sx={{ maxWidth: '80%', boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}>
                        <Table>
                            <TableHead sx={{ width: "100%", textAlign: "center" }}>
                                <TableRow>
                                    <TableCell colSpan={2}>
                                    <Typography variant="subtitle1" sx={{textAlign:"center", color: "black", transition: "all 1000ms", ':hover': { color: "black" } }}>Listado de aptitudes</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.aptitudes.map((conocimiento, index) => (
                                    <TableRow key={index}>
                                        <TableCell >
                                            <Typography variant="body1" sx={{ color: "black", transition: "all 1000ms" }}>
                                                {conocimiento.aptitud.nombre_aptitud}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                
                                            <Tooltip title="Eliminar Apititud">
                                                <DeleteIcon style={{cursor:"pointer"}} className="iconn" onClick={()=>eliminar_conocimiento(conocimiento.id_conocimiento)}  />
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
             
            </Grid>
        )
    }
    if(!loading && !data.aptitudes){
     
        return (
            <Grid sx={{width:"40%",margin:"0px auto",marginTop:"20px"}}>
        
                <Alert severity="error">No tiene aptitudes asociadas</Alert>
            </Grid>
        )
    }
    if(loading){
        return (
            <Grid sx={{width:"35%",margin:"0px auto",marginTop:"20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                Cargando datos.........
                <CircularProgress/>
            </Grid>
        )
    }
    
}

export default MisAptitudes;