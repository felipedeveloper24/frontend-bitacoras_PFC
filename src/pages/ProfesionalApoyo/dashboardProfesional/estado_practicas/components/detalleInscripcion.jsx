import { TableBody , CircularProgress, Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Tooltip, Alert, Button, Card, Modal, Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../../../../helpers/clienteaxios";
import { CheckCircleOutline, ContentPasteSearchOutlined, DoNotDisturb, Edit, FileCopy, TimerOutlined, Visibility } from "@mui/icons-material";
import { useState } from "react";
import FormularioActualizar from "./formularioActualizar";



const DetalleInscripcion = ({id})=>{

    const navigate = useNavigate();
    
    const {data,status} = useQuery("detalleinscripcion", async()=>{
        const response = await clienteAxios.get(`/inscripcion/show/${id}`)
     
        return response.data
    
    })
    const formato = (texto)=>{
        return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    }
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
      };
    
    if(status=="success" && data.inscripcion ){
        let fecha_inicio = data.inscripcion.fecha_inicio.split("T")[0];
         fecha_inicio = (formato(fecha_inicio))
         let fecha_fin = data.inscripcion.fecha_fin.split("T")[0];
         fecha_fin = formato(fecha_fin)
        return (
            <Grid>
                <Modal sx={{zIndex:2}} open={open}  onClose={handleClose}>
                    <Box
                        sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: "50%",
                        bgcolor: 'background.paper',
                        maxHeight: '80vh',
                        boxShadow: 24,
                        overflow:"auto",
                        p: 4,
                        }}
                    >
                        <Typography variant="h5" sx={{textAlign:"center",display:"flex",justifyContent:"center", alignItems:"center"}}>Actualizar estado de solicitud </Typography>
                     
                       <FormularioActualizar id_estado={data.inscripcion.estado_inscripcion.id_estado_inscripcion} id_inscripcion={data.inscripcion.id_inscripcion_practica}/>
                     
                    </Box>
                </Modal>
                <Typography sx={{textAlign:"center",marginTop:"10px"}} variant="h6">Detalle inscripción</Typography>
                 <TableContainer component={Paper} sx={{ maxWidth: '90%',margin:"0px auto",marginTop:"10px", boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}>
                            <Table>
                            <TableHead sx={{ width: "100%", textAlign: "center" }}>
                            <TableRow>
                            <TableCell>Fecha Inicio</TableCell>
                            <TableCell>Fecha Término</TableCell>
                            <TableCell>Observaciones</TableCell>
                            <TableCell>Modalidad</TableCell>
                            <TableCell>Nota</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                            </TableHead>
                                <TableBody>
                                <TableRow>
                                        <TableCell>
                                            {fecha_inicio}
                                        </TableCell>
                                        <TableCell>
                                            {fecha_fin}
                                        </TableCell>
                                        <TableCell>
                                            {data.inscripcion.observaciones== "" ? "----------" : data.inscripcion.observaciones }
                                        </TableCell>
                                        <TableCell>
                                            {data.inscripcion.modalidad.nombre_modalidad}
                                        </TableCell>
                                        <TableCell>
                                            {data.inscripcion.nota_final == 0 ? "-----" : data.inscripcion.nota_final }
                                        </TableCell>
                                        <TableCell sx={{display:"flex"}}>
                                            {
                                                data.inscripcion.estado_inscripcion.id_estado_inscripcion == 1 && (
                                                    <TimerOutlined style={{marginRight:"5px"}} />
                                                    
                                                )
                                            }
                                           {
                                                data.inscripcion.estado_inscripcion.id_estado_inscripcion == 2 && (
                                                    <CheckCircleOutline style={{marginRight:"5px"}}/>
                                                )
                                           }
                                           
                                           
                                            {
                                                data.inscripcion.estado_inscripcion.id_estado_inscripcion == 3 && (
                                                    <DoNotDisturb style={{marginRight:"5px"}} />
                                                )
                                            
                                            }
                                            {data.inscripcion.estado_inscripcion.nombre_estado_inscripcion}
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Evaluar solicitud de inscripción" >
                                                 <Edit sx={{cursor:"pointer"}} onClick={handleOpen} />
                                            </Tooltip>
                                            <Tooltip title="Evaluar práctica" >
                                                 <ContentPasteSearchOutlined sx={{cursor:"pointer"}} onClick={()=>{navigate(`/evaluarinscripcion/${id}`)}} />
                                            </Tooltip>
                                            <Tooltip title="Documentos">
                                                  <FileCopy sx={{cursor:"pointer"}} onClick = {()=>{navigate(`/documentosinscripcion/${data.inscripcion.id_inscripcion_practica}`)}} />
                                            </Tooltip>
                                            <Tooltip  title="Ver bitacoras alumno">
                                                <Visibility sx={{cursor:"pointer"}} onClick = {()=>{navigate(`/bitacoras/${data.inscripcion.id_inscripcion_practica}`)}} />
                                            </Tooltip>
                                            
                                        </TableCell>
                                    </TableRow>   
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {
                            data.inscripcion.id_representante == null && (
                                <Grid sx={{width:"100%"}}>
                                    <Alert severity="warning" sx={{width:"40%",margin:"0px auto",marginTop:"15px"}}>El alumno no tiene registrado el evaluador.</Alert>
                                    
                                </Grid>
                            )
                        }
                        {
                            data.inscripcion.id_representante != null && (
                                <TableContainer component={Paper} sx={{ maxWidth: '60%',margin:"0px auto",marginTop:"10px", boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}>
                                <Table>
                                <TableHead sx={{ width: "100%", textAlign: "center" }}>
                                <TableRow>
                                <TableCell>Datos evaluador empresa</TableCell>
                              
                            </TableRow>
                                </TableHead>
                                    <TableBody>
                                    <TableRow>
                                        <TableCell>Nombre: {data.inscripcion.representante.nombre}</TableCell>
                                          
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Apellido: {data.inscripcion.representante.apellido}</TableCell>
                                          
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Correo: {data.inscripcion.representante.correo}</TableCell>
                                          
                                    </TableRow>   
                                    <TableRow>
                                        <TableCell>Teléfono: {data.inscripcion.representante.telefono}</TableCell>
                                          
                                    </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer> 
                            )
                        }
            </Grid>
        )
    }
    if(status=="success" && !data.inscripcion){
        return (
        
            <Grid>
              
                <Typography sx={{textAlign:"center",marginTop:"10px"}} variant="h6">Detalle inscripción</Typography>
                 <TableContainer component={Paper} sx={{ maxWidth: '90%',margin:"0px auto",marginTop:"10px", boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}>
                            <Table>
                            <TableHead sx={{ width: "100%", textAlign: "center" }}>
                            <TableRow>
                            <TableCell>Fecha Inicio</TableCell>
                            <TableCell>Fecha Término</TableCell>
                            <TableCell>Observaciones</TableCell>
                            <TableCell>Modalidad</TableCell>
                            <TableCell>Representante</TableCell>
                            <TableCell>Nota</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                            </TableHead>
                               
                            </Table>
                            <Alert severity="error" sx={{textAlign:"center"}}>El alumno tiene inscrita la práctica via intranet, pero no está registrado en el sistema de prácticas profesionales</Alert>
                        </TableContainer>
            </Grid>
        )
    }
    if(status=="loading"){
        return(
        <Grid sx={{width:"35%",margin:"0px auto",marginTop:"20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            Cargando datos.........
            <CircularProgress/>
        </Grid>
        )
    }
}

export default DetalleInscripcion;
