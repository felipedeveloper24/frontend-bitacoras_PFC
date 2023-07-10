import { Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import HeaderProfesional from "../../../components/headers/headerProfesional";
import Empresas from "./empresas";
import { useState } from "react";
import ContadorPractica1 from "../components/contador_practica1";
import Contadorpractica2 from "../components/contadorpractica2";
import { useQuery, useQueryClient } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import { useNavigate } from "react-router-dom";

const DashboardProfesional = ()=>{
    const [anio,setanio] = useState(2023)
    const [periodo_academico,setPeriodo] = useState(1)
    const navigate = useNavigate();
    const queryclient = useQueryClient();
    
    const onSubmit = (e)=>{
        e.preventDefault();
        /*
        queryclient.refetchQueries("lpractica1ieci")
        queryclient.refetchQueries("lpractica2ieci")
        queryclient.refetchQueries("lpractica1icinf")
        queryclient.refetchQueries("lpractica2icinf")
        */
       getListadoPractica1ICINF.refetch()
       getListadoPractica2ICINF.refetch()
       getListadoPractica1IECI.refetch()
       getListadoPractica2IECI.refetch()
    }

    const getListadoPractica1IECI = useQuery("lpractica1ieci",async()=>{
        const response = await clienteAxios.post("/inscripcion/listadopractica1ieci",{
            anio:anio,
            id_periodo:periodo_academico,
            id_asignatura:620509
        })
        if(response.status == 200){
            
            return response.data
        }
    })

    const getListadoPractica2IECI = useQuery("lpractica2ieci",async()=>{
        const response = await clienteAxios.post("/inscripcion/listadopractica2ieci",{
            anio:anio,
            id_periodo:periodo_academico
        })
        if(response.status == 200){
            return response.data
        }
    })

    const getListadoPractica1ICINF = useQuery("lpractica1icinf", async()=>{
        const response = await clienteAxios.post("/inscripcion/listadopractica1icinf",{
            anio:anio,
            id_periodo:periodo_academico
        })
        if(response.status == 200){
            return response.data
        }
    })
    const getListadoPractica2ICINF = useQuery("lpractica2icinf",async()=>{
        const response = await clienteAxios.post("/inscripcion/listadopractica2icinf",{
            anio:anio,
            id_periodo:periodo_academico
        })
        if(response.status == 200){
            return response.data
        }
    })

    return(
        <Grid sx={{
            width:"100%",
            display:"flex",
            flexDirection:"column"
        }}>
            <HeaderProfesional/>
            <Typography variant="h6" sx={{textAlign:"center",marginTop:"15px", marginBottom:"10px"}}>Ingrese el semestre y periodo</Typography>
            <form onSubmit={onSubmit} style={{width:"70%",margin:"0px auto"}}>
                <Grid container spacing={2}>
                    <Grid lg={4} item>               
                            <TextField placeholder="202x" value={anio}
                             onChange={(e)=>{
                                setanio(e.target.value);
                                
                                }} label="Año" fullWidth />
                    </Grid>
                    <Grid item lg={4}> 
                        <FormControl fullWidth>
                            <InputLabel>Seleccione periodo</InputLabel>
                            <Select onChange={
                                (e)=>{setPeriodo(e.target.value)
                                  
                                }} value={periodo_academico} label="Seleccione periodo" fullWidth>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} sx={{display:"flex",alignItems:"center"}}>
                        <Button type="submit" variant="contained">Buscar</Button>
                    </Grid>
                </Grid>
            </form>
            <Typography variant="h5" sx={{textAlign:"center",marginTop:"10px"}}>Ingeniería de Ejecución en Computación e Informática </Typography>
            <Grid container spacing={2} sx={{display:"flex", justifyContent:"center",marginTop:"10px"}}>
                <Grid item lg={5}>
                    <Card sx={{paddingTop:"20px",paddingBottom:"40px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <Typography variant="h5" sx={{textAlign:"center"}}>Práctica profesional 1</Typography>
                        {
                            getListadoPractica1IECI.status == "success" && <Typography variant="h6" sx={{textAlign:"center"}}>Alumnos inscritos: {getListadoPractica1IECI.data.cantidad_alumnos} </Typography>
                        }
                        {
                            getListadoPractica1IECI.status == "success" && <Button onClick={()=>{navigate(`/estadopracticas/${anio}/${periodo_academico}/620509/${getListadoPractica1IECI.data.carrera}`)}} variant="contained">Ver situación estudiantes</Button>
                        }
                        
                    </Card>
                </Grid>
                <Grid item lg={5}>
                    <Card sx={{paddingTop:"20px",paddingBottom:"40px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <Typography variant="h5" sx={{textAlign:"center"}}>Práctica profesional 2</Typography>
                        {
                            getListadoPractica2IECI.status == "success" && <Typography variant="h6" sx={{textAlign:"center"}}>Alumnos inscritos: {getListadoPractica2IECI.data.cantidad_alumnos} </Typography>
                        }
                        {
                            getListadoPractica2IECI.status == "success" && <Button onClick={()=>{navigate(`/estadopracticas/${anio}/${periodo_academico}/620520/${getListadoPractica2IECI.data.carrera}`)}} variant="contained">Ver situación estudiantes</Button>
                        }
                       
                    </Card>
                </Grid>
            </Grid>
            <Typography variant="h5" sx={{textAlign:"center",marginTop:"10px"}}>Ingeniería de Civil en Informática </Typography>
            <Grid container spacing={2} sx={{display:"flex", justifyContent:"center",marginTop:"10px",marginBottom:"20px"}}>
                <Grid item lg={5}>
                    <Card sx={{paddingTop:"20px",paddingBottom:"40px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <Typography variant="h5" sx={{textAlign:"center"}}>Práctica profesional 1</Typography>
                        {
                            getListadoPractica1ICINF.status == "success" && <Typography variant="h6" sx={{textAlign:"center"}}>Alumnos inscritos: {getListadoPractica1ICINF.data.cantidad_alumnos} </Typography>
                        }
                        {
                            getListadoPractica1ICINF.status == "success" && <Button onClick={()=>{navigate(`/estadopracticas/${anio}/${periodo_academico}/620509/${getListadoPractica1ICINF.data.carrera}`)}} variant="contained">Ver situación estudiantes</Button>
                        }
                    </Card>
                </Grid>
                <Grid item lg={5}>
                    <Card sx={{paddingTop:"20px",paddingBottom:"40px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <Typography variant="h5" sx={{textAlign:"center"}}>Práctica profesional 2</Typography>
                        {
                            getListadoPractica2ICINF.status == "success" && <Typography variant="h6" sx={{textAlign:"center"}}>Alumnos inscritos: {getListadoPractica2ICINF.data.cantidad_alumnos} </Typography>
                        }
                        {
                            getListadoPractica2ICINF.status == "success" && <Button onClick={()=>{navigate(`/estadopracticas/${anio}/${periodo_academico}/620520/${getListadoPractica2ICINF.data.carrera}`)}} variant="contained">Ver situación estudiantes</Button>
                        }
                        
                    </Card>
                </Grid>

            </Grid>
           

        </Grid>
    )
};


export default DashboardProfesional;