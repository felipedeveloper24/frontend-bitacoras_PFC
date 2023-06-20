import { Grid, Typography,Box ,Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper} from "@mui/material"

const DatosPersonales = ({data})=>{

    return (
        <Grid sx={{width:"100%"}}>
            <TableContainer component={Paper} sx={{ maxWidth: '70%',margin:"0px auto",marginTop:"10px", boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}>
                        <Table>
                        <TableHead sx={{ width: "100%", textAlign: "center" }}>
                        <TableRow>
                            <TableCell colSpan={2}>
                            <Typography variant="subtitle1" sx={{textAlign:"center", color: "black", transition: "all 1000ms", ':hover': { color: "black" } }}>Datos personales</Typography>
                            </TableCell>
                        </TableRow>
                        </TableHead>
                            <TableBody>
                            
                                    <TableRow>
                                        <TableCell >
                                                Primer Nombre: {data.primer_nombre}
                                        </TableCell>
                                        <TableCell >
                                                Segundo Nombre: {data.segundo_nombre}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell >
                                                Apellido Paterno: {data.apellido_paterno}
                                        </TableCell>
                                        <TableCell >
                                                    Apellido Materno: {data.apellido_materno}
                                            </TableCell>
                                    </TableRow>
                                    <TableRow>
                                            <TableCell >
                                                Correo Institucional: {data.correo_institucional}
                                    
                                        </TableCell>
                                        <TableCell >
                                                Correo Personal: {data.correo_personal}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell >
                                                Dirección Académica: {data.direccion_academica}
                                        </TableCell>
                                        <TableCell >
                                                Dirección Particular: {data.direccion_particular}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                       
                                        <TableCell>
                                                Teléfono Personal: {data.telefono_personal}
                                        </TableCell>
                                        <TableCell>
                                                Teléfono familiar: {data.telefono_familiar}
                                        </TableCell>
                                    </TableRow>
                                    

                               
                            </TableBody>
                        </Table>
                    </TableContainer>
        </Grid>
    )
}

export default DatosPersonales;