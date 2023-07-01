import { Alert, Button, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { useQuery } from "react-query";
import clienteAxios from "../../../../../helpers/clienteaxios";
import { Add, Delete, Edit } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const MostrarOfertas = ()=>{

    const getOfertas = useQuery("ofertas",async()=>{
        const response = await clienteAxios.get("/oferta/getall");

        if(response.status == 200){
            return response.data;
        }
    });
    const navigate = useNavigate();
    const eliminar_oferta = async(id)=>{
        Swal.fire({
            title: '¿Estás seguro si quieres eliminar la oferta?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText:"Cancelar"
        }).then(async(result) =>{
            if(result.isConfirmed){
                const response = await clienteAxios.delete(`/oferta/delete/${id}`);
                if(response.status==200){
                    Swal.fire({
                        title:"Eliminada",
                        text:" Oferta eliminada correctamente",
                        icon:"success",
                        confirmButtonText:"Aceptar"
                    })
                    setTimeout(()=>{
                        window.location.reload()
                    },2000)
                   
                }
            }
        });
       

    }
    if(getOfertas.status == "success" && getOfertas.data.ofertas){    
        return (
            <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
                <Grid sx={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"15px"}}>
                    <Typography variant="h5" sx={{textAlign:"center"}}>Ofertas de prácticas profesionales </Typography>
                    <Button sx={{marginLeft:"10px"}} variant="contained" onClick={()=>navigate("/crearoferta")} >Añadir oferta</Button>
                </Grid>
                <TableContainer component={Paper} sx={{width:"90%",margin:"0px auto",marginTop:"20px"}}>
                    <Table stickyHeader sx={{ minWidth: 650,maxHeight:300 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Experiencia</TableCell>
                                <TableCell>Cupos</TableCell>
                                <TableCell>Modalidad</TableCell>
                                <TableCell>Periódo académico</TableCell>
                                <TableCell>Empresa</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                getOfertas.data.ofertas.map((oferta,idx)=>(
                                    <TableRow key={idx}>
                                        <TableCell>{oferta.descripcion}</TableCell>
                                        <TableCell>{oferta.experiencia_laboral == true ? "Si" : "No"}</TableCell>
                                        <TableCell>{oferta.cupos}</TableCell>
                                        <TableCell>{oferta.modalidad.nombre_modalidad}</TableCell>
                                        <TableCell>{oferta.periodo_academico.anio} - {oferta.periodo_academico.periodo} </TableCell>
                                        <TableCell>{oferta.empresa.razon_social}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Modificar Oferta">
                                                 <Edit sx={{cursor:"pointer"}} onClick={()=>navigate(`/modificaroferta/${oferta.id_oferta_practica}`)} />
                                            </Tooltip>
                                              
                                              <Tooltip title="Eliminar Oferta">
                                                <Delete sx={{cursor:"pointer"}} onClick={()=>eliminar_oferta(oferta.id_oferta_practica)} />
                                              </Tooltip>
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
    if(getOfertas.status == "success" && !getOfertas.data.ofertas){
        return (
            <Grid sx={{width:"100%",display:"flex",flexDirection:"column",margin:"0px auto"}}>
                
                <Grid sx={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"15px"}}>
                    <Typography variant="h5" sx={{textAlign:"center"}}>Ofertas de prácticas profesionales </Typography>
                    <Button sx={{marginLeft:"10px"}} variant="contained" onClick={()=>navigate("/crearoferta")} >Añadir oferta</Button>
                </Grid>
                <TableContainer component={Paper} sx={{width:"90%",margin:"0px auto",marginTop:"20px"}}>
                    <Table stickyHeader sx={{ minWidth: 650,maxHeight:300 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Experiencia</TableCell>
                                <TableCell>Cupos</TableCell>
                                <TableCell>Modalidad</TableCell>
                                <TableCell>Periodo académico</TableCell>
                                <TableCell>Empresa</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                    <Alert severity="error"  sx={{margin:"0px auto",marginTop:"10px",marginBottom:"10px",width:"40%",textAlign:"center"}}>No hay ofertas registradas</Alert>
                </TableContainer>
            </Grid>
        )
        
    }
    if(getOfertas.status=="loading"){
        return (
            <Grid sx={{width:"35%",margin:"0px auto",marginTop:"20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                Cargando datos.........
                <CircularProgress/>
            </Grid>
        )
    }

}


export default MostrarOfertas;