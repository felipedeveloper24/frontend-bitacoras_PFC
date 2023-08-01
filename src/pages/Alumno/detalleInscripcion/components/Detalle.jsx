import { Card, Grid, Typography ,Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert, Tooltip} from "@mui/material";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import { CheckCircleOutline, DoNotDisturb, Edit, FileCopy, School, Timer10Outlined, TimerOutlined } from "@mui/icons-material";
import RegistroEvaluador from "./registro_evaluador";
import { useNavigate } from "react-router-dom";


const Detalle = ({id})=>{
    const navigate = useNavigate();
    const {data,status} = useQuery("detalleinscripcion", async()=>{
        const response = await clienteAxios.get(`/inscripcion/show/${id}`)
        return response.data.inscripcion
    })
    const formato = (texto)=>{
        return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    }
    if(status=="success" && data){

            
            let fecha_inicio = data.fecha_inicio.split("T")[0];
            fecha_inicio = (formato(fecha_inicio))
            let fecha_fin = data.fecha_fin.split("T")[0];
            fecha_fin = formato(fecha_fin)
        
       
        return (
            <Grid sx={{marginTop:"15px"}}>
                <Typography sx={{textAlign:"center",marginTop:"10px",display:"flex",justifyContent:"center",alignItems:"center"}} variant="h6">Detalle inscripción <School style={{marginLeft:"5px"}}/></Typography>
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
                                <TableBody>
                                <TableRow>
                                        <TableCell>
                                            {fecha_inicio}
                                        </TableCell>
                                        <TableCell>
                                            {fecha_fin}
                                        </TableCell>
                                        <TableCell>
                                            {data.observaciones== "" ? "----------" : data.observaciones }
                                        </TableCell>
                                        <TableCell>
                                            {data.modalidad.nombre_modalidad}
                                        </TableCell>
                                        <TableCell>
                                            {data.representante == null ? "No registrado" : `${data.representante.nombre} ${data.representante.apellido} `}
                                        </TableCell>
                                        <TableCell>
                                            {data.nota_final == 0 ? "-----" : data.nota_final }
                                        </TableCell>
                                        <TableCell >
                                            {
                                                data.estado_inscripcion.id_estado_inscripcion == 1 && (
                                                    <TimerOutlined style={{marginRight:"5px"}} />
                                                    
                                                )
                                            }
                                           {
                                                data.estado_inscripcion.id_estado_inscripcion == 2 && (
                                                    <CheckCircleOutline style={{marginRight:"5px"}}/>
                                                )
                                           }
                                            {
                                                data.estado_inscripcion.id_estado_inscripcion == 3 && (
                                                    <DoNotDisturb style={{marginRight:"5px"}} />
                                                )
                                            }
                                            {data.estado_inscripcion.nombre_estado_inscripcion}
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Modificar inscripción" >
                                                 <Edit sx={{cursor:"pointer"}} onClick={()=>{navigate(`/modificarinscripcion/${id}`)}} />
                                            </Tooltip>
                                            <Tooltip title="Documentos">
                                                  <FileCopy sx={{cursor:"pointer"}} onClick = {()=>{navigate(`/documentosinscripcion/${data.id_inscripcion_practica}`)}} />
                                            </Tooltip>
                                            
                                        </TableCell>
                                    </TableRow>   
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {
                            data.id_representante == null && (
                                <Grid sx={{width:"100%"}}>
                                    <Alert severity="warning" sx={{width:"40%",margin:"0px auto",marginTop:"15px"}}>Te falta registrar el Evaluador.</Alert>
                                    <RegistroEvaluador/>
                                </Grid>
                            )
                        }
            </Grid>
        )
    }
    if(status=="loading"){
        <Grid sx={{width:"35%",margin:"0px auto",marginTop:"20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            Cargando datos.........
            <CircularProgress/>
        </Grid>
    }
    
   

}
export default Detalle;