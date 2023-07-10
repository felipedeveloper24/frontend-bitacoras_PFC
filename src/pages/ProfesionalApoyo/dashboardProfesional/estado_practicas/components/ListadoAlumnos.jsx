import { Grid, Table, TableContainer, TableRow,TableHead ,Typography, TableCell, Alert, Paper, TableBody, Tooltip, CircularProgress } from "@mui/material";
import { useQuery } from "react-query";
import clienteAxios from "../../../../../helpers/clienteaxios";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";




const ListadoAlumnos = ({anio,periodo,asignatura,carrera})=>{
    const navigate = useNavigate();

    const getListadoAlumnos = useQuery("listadoalumnos",async()=>{
        
        const response = await clienteAxios.post("/inscripcion/listadogeneral",{
            anio:Number(anio),
            periodo_academico:Number(periodo),
            asignatura:Number(asignatura),
            carrera:Number(carrera)
        }) 

        if(response.status==200){
            return response.data;
        }   
    })

    if(getListadoAlumnos.status == "success" && getListadoAlumnos.data.alumnos.length > 0){
        return (
            
            <TableContainer component={Paper} sx={{width:"90%",margin:"0px auto",marginTop:"20px"}}>
                <Table stickyHeader sx={{ minWidth: 650,maxHeight:300 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>RUT</TableCell>
                        <TableCell >Nombre</TableCell>
                        <TableCell>Apellido</TableCell>
                        <TableCell>Correo</TableCell>
                        <TableCell>Periodo académico</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Array.isArray(getListadoAlumnos.data.alumnos) && getListadoAlumnos.data.alumnos.map((alumno,idx)=>(
                                <TableRow key={idx}>
                                    <TableCell>{alumno.alumno.rut}</TableCell>
                                    <TableCell>{alumno.alumno.primer_nombre}</TableCell>
                                    <TableCell>{alumno.alumno.apellido_paterno}</TableCell>
                                    <TableCell>{alumno.alumno.correo_institucional}</TableCell>
                                    <TableCell>{alumno.periodo_academico.anio} - {alumno.periodo_academico.id_periodo_academico}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Ver inscripción practica profesional">
                                            <Visibility sx={{cursor:"pointer"}} onClick={()=>{navigate(`/informaciongeneral/${alumno.id_inscripcion}`)}}/>
                                        </Tooltip>
                                        
                                    </TableCell>
                                    
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                </TableContainer>
        )
    }

    if(getListadoAlumnos.status == "success" && getListadoAlumnos.data.alumnos.length == 0){
        return (
            <TableContainer component={Paper} sx={{width:"90%",margin:"0px auto",marginTop:"20px"}}>
            <Table stickyHeader sx={{ minWidth: 650,maxHeight:300 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>RUT</TableCell>
                    <TableCell >Nombre</TableCell>
                    <TableCell>Apellido</TableCell>
                    <TableCell>Correo</TableCell>
                    <TableCell>Periodo académico</TableCell>
                    <TableCell>Acciones</TableCell>
                </TableRow>
                </TableHead>
               
            </Table>
            <Alert severity="error">No hay alumnos inscritos desde intranet</Alert>
            </TableContainer>
        )
    }
    if(getListadoAlumnos.status == "loading"){
        <Grid sx={{width:"35%",margin:"0px auto",marginTop:"20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        Cargando datos.........
        <CircularProgress/>
    
        </Grid>
    }
    
}

export default ListadoAlumnos;