import { Card, Grid, Typography ,Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper} from "@mui/material";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";


const Detalle = ({id})=>{
    
    const {data,status} = useQuery("detalleinscripcion", async()=>{
        const response = await clienteAxios.get(`/inscripcion/show/${id}`)
        return response.data.inscripcion
    })
    const formato = (texto)=>{
        return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    }
    if(status=="success"){
        let fecha_inicio = data.fecha_inicio.split("T")[0];
         fecha_inicio = (formato(fecha_inicio))
         let fecha_fin = data.fecha_fin.split("T")[0];
         fecha_fin = formato(fecha_fin)
        return (
            <Grid>
                <Typography sx={{textAlign:"center",marginTop:"10px"}} variant="h5">Detalle inscripción</Typography>
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
                                            {data.observaciones== "" ? "----" : data.observaciones }
                                        </TableCell>
                                        <TableCell>
                                            {data.modalidad.nombre_modalidad}
                                        </TableCell>
                                        <TableCell>
                                            {data.representante == null ? "No registrado" : data.representante.nombre}
                                        </TableCell>
                                        <TableCell>
                                            {data.nota_final == 10 ? "-----" : data.nota_final }
                                        </TableCell>
                                        <TableCell>
                                            {data.estado_inscripcion.nombre_estado_inscripcion}
                                        </TableCell>
                                    </TableRow>   
                                </TableBody>
                            </Table>
                        </TableContainer>
            </Grid>
        )
    }
   

}
export default Detalle;