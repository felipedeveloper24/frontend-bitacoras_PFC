import { Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from "@mui/material";
import { useQuery } from "react-query";
import clienteAxios from "../../../../../helpers/clienteaxios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const FormularioIngresar = ()=>{

    const [descripcion,setDescripcion] = useState("");
    const [cupos,setCupos] = useState("");
    const [experiencia,setExperiencia] = useState(0);
    const [modalidad,setModalidad] = useState('');
    const [empresa,setEmpresa] = useState('');
    const [periodo,setPeriodo] = useState('');

    const navigate = useNavigate();
    const getmodalidades = useQuery("modalidades", async()=>{
        const response = await clienteAxios.get("/inscripcion/modalidades");
        if(response.status == 200){
            return response.data.modalidades
        }
    });

    const getEmpresas = useQuery("empresas", async()=>{
        const response = await clienteAxios.get("/empresa/getall");
        if(response.status == 200){
            return response.data.empresas
        }
    });

    const getPeriodos = useQuery("periodos",async()=>{
        const response = await clienteAxios.get("/periodo/getall");
        if(response.status == 200){
            return response.data.periodos;
        }
    });

    const onSubmit = async(e)=>{
        e.preventDefault();
        const data = {
            descripcion:descripcion,
            experiencia_laboral:experiencia == 1 ? true : false,
            cupos:Number(cupos),
            id_modalidad:modalidad,
            id_periodo_academico:periodo,
            id_empresa:empresa
        }
        
        const response = await clienteAxios.post("/oferta/create",data);
        if(response.status==200){
            Swal.fire({
                title:"Registrado",
                text:"La oferta de práctica ha sida registrada correctamente",
                icon:"success",
                confirmButtonText:"Aceptar",
            })
            setTimeout(()=>{
                navigate("/ofertapracticas");
                window.location.reload();
            },2000)
        }
    }

    return (
        <form style={{width:"70%",margin:"0px auto"}} onSubmit={onSubmit}>
            <Card sx={{padding:"15px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <TextField label="Descripcion" value={descripcion} required onChange={(e)=>{setDescripcion(e.target.value)}} fullWidth/>
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <TextField label="Cupos" value={cupos} type="number" required onChange={(e)=>{setCupos(e.target.value)}}  fullWidth/>
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel>Experiencia Laboral</InputLabel>
                            <Select label="Experiencia Laboral" value={experiencia} onChange={(e)=>{setExperiencia(e.target.value)}} fullWidth>
                                <MenuItem value={0}>No</MenuItem>
                                <MenuItem value={1}>Si</MenuItem>
                               
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10} >
                        <FormControl margin="normal" fullWidth>
                            <InputLabel>Modalidad</InputLabel>
                            <Select required label="Modalidad" value={modalidad} onChange={(e)=>{setModalidad(e.target.value)}} fullWidth>
                                {
                                    getmodalidades.status=="success" && (
                                        getmodalidades.data.map((modalidad,idx)=>(
                                            <MenuItem key={idx} value={modalidad.id_modalidad} >{modalidad.nombre_modalidad}</MenuItem>
                                        ))
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel>Empresa</InputLabel>
                            <Select required label="Empresa" value={empresa} onChange={(e)=>{setEmpresa(e.target.value)}} fullWidth>
                                {
                                    getEmpresas.status=="success" && Array.isArray(getEmpresas.data) && (
                                        getEmpresas.data.map((empresa,idx)=>(
                                            <MenuItem key={idx} value={empresa.id_empresa} >{empresa.razon_social}</MenuItem>
                                        ))
                                    )
                                }
                            </Select>
                            </FormControl>
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel>Periodo académico</InputLabel> 
                            <Select label="Periodo académico" value={periodo} onChange={(e)=>{setPeriodo(e.target.value)}} fullWidth>
                                {
                                        getPeriodos.status=="success" && Array.isArray(getPeriodos.data) && (
                                            getPeriodos.data.map((periodo,idx)=>(
                                                <MenuItem key={idx} value={periodo.id_periodo_academico}>{periodo.anio} - {periodo.periodo}</MenuItem>
                                            ))
                                        )
                                }
                            </Select>
                            </FormControl>
                    </Grid>
                    <Grid item xs={11} xl={6} lg={12} md={6} sm={10} sx={{display:"flex",justifyContent:"center"}}>
                        <Button type="submit" variant="contained">Enviar datos</Button>
                    </Grid>
                </Grid>
            </Card>
        </form>
    )
}


export default FormularioIngresar;