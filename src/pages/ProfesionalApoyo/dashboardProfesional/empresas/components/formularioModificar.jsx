import {  Grid,Button, Box,TextField,Typography, Modal, MenuItem, InputLabel, Alert, FormControl } from "@mui/material"
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "@mui/material/Select";
import { useQuery } from "react-query";
import clienteAxios from "../../../../../helpers/clienteaxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const FormularioModificar = ({id})=>{
    

    const [loading,setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const [rut_empresa,setRut] = useState("");
    const [razon_social,setRazonSocial] = useState("");
    const [direccion,setDireccion] = useState("");
    const [centro_practica,setCentroPractica] = useState("");
    const [correo,setCorreo] = useState("")
    const [telefono,setTelefono] = useState("")
    const [comuna,setComuna] = useState("");
    const [estado,setEstado] = useState("");
    const [empresa,setEmpresa] = useState({})

    const getcomunas = useQuery("comunas", async()=>{
        const response = await clienteAxios.get("/comuna/getComunas");
        if(response.status==200){
        
            return response.data.comuna;
        }
       
    })
    const navigate = useNavigate()
    const getEmpresa = async()=>{
        const response = await clienteAxios.get(`/empresa/show/${id}`);
        if(response.status==200){
            console.log(response.data.empresa)
            setEmpresa(response.data.empresa)
            setRut(response.data.empresa.rut_empresa)
            setRazonSocial(response.data.empresa.razon_social)
            setDireccion(response.data.empresa.direccion);
            const is_centro = response.data.empresa.centro_practica == true ? 1 : 0
            setCentroPractica(is_centro)
            setCorreo(response.data.empresa.correo)
            setTelefono(response.data.empresa.telefono)
            setComuna(response.data.empresa.id_comuna)
            setEstado(response.data.empresa.id_estado_empresa)
            setLoading(false)
            
        }
    };

    useEffect(()=>{
        getEmpresa();
    },[])
    
 
    
    
    const handleComuna = (event)=>{
        setComuna(event.target.value);
    }

 


    const getEstados = useQuery("estados",async()=>{
       const response = await clienteAxios.get("/estadoempresa/getall");
       return response.data.estados;
    })

  

    const onSubmit =  async(e)=>{
        e.preventDefault();
        const data_oficial = {
            rut_empresa: rut_empresa,
            razon_social: razon_social,
            direccion:direccion,
            centro_practica: centro_practica == 1 ? true: false,
            correo: correo,
            telefono: telefono,
            id_comuna: comuna,
            id_estado_empresa: estado

        }
        const response = await clienteAxios.put(`empresa/update/${id}`,data_oficial);

        if(response.status==200){
            Swal.fire({
                title:"Actualizada",
                text:"La empresa ha sido actualizada correctamente",
                icon:"success",
                confirmButtonText:"Aceptar",
                customClass:{
                    container:"sweetalert_container"
                }
            })
            setTimeout(()=>{
                navigate("/empresas");
                window.location.reload();
            },2000)
        }
      
    }
    if(!loading){
        return (
            <Grid sx={{width:"75%",margin:"0px auto"}}>
                 <Typography variant="h5" sx={{textAlign:"center",marginTop:"10px",marginBottom:"10px"}} >Empresa seleccionada: {empresa.razon_social} </Typography>
               <form method="POST" onSubmit={onSubmit}>
                    <Grid container spacing={2} sx={{marginTop:"10px"}}>
    
                         <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <TextField label="Rut" fullWidth  value={rut_empresa} onChange={(e)=>{setRut(e.target.value)}} />
                                </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                        <TextField label="Razón social" value={razon_social} onChange={(e)=>{setRazonSocial(e.target.value)}} fullWidth />
                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>    
                                            <TextField label="Dirección" value={direccion} onChange={(e)=>{setDireccion(e.target.value)}} fullWidth />
                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                    <FormControl fullWidth>
                                        <InputLabel>Centro de práctica</InputLabel>
                                            <Select label="Centro de práctica" required      
                                                fullWidth
                                                value={centro_practica}
                                                onChange={(e)=>{setCentroPractica(e.target.value)}}
                                                >
                                
                                                <MenuItem value={1}>Si</MenuItem>
                                                <MenuItem value={0}>No</MenuItem>
                                            </Select>
                                    </FormControl>      
                                </Grid>
    
                                <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                        <TextField label="Correo" 
                                        
                                        value={correo}
                                        onChange = {(e)=>{setCorreo(e.target.value)}}
                                        
                                        fullWidth />
                                </Grid>
                                <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                        <TextField label="Teléfono" value={telefono} onChange={(e)=>{setTelefono(e.target.value)}} fullWidth/>
                                </Grid>
    
                                <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                    <FormControl margin="normal" fullWidth>
                                        <InputLabel>Comuna</InputLabel>
                                        <Select                                    
                                                value={comuna}
                                                label="Comuna"
                                                onChange={handleComuna} 
                                                fullWidth >
    
                                              {
                                                getcomunas.status=="success" && getcomunas.data.map((comuna,idx)=>{
                                                    return(
                                                        <MenuItem key={idx} value={comuna.id_comuna}>{comuna.nombre} </MenuItem>
                                                    )
                                                   
                                                })
                                              }
                                                
                                                
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                    <FormControl  margin="normal" fullWidth>
                                        <InputLabel>Estado Empresa</InputLabel>
                                        <Select label="Estado Empresa"
                                                value={estado}
                                                onChange={(e)=>{setEstado(e.target.value)}}
                                                fullWidth >
                                                {
                                                    getEstados.status == "success" && getEstados.data.map((estado,idx)=>{
                                                        return (
                                                            <MenuItem key={idx} value={estado.id_estado_empresa} >{estado.nombre_estado_empresa}</MenuItem>
                                                        )
                                                    })
                                                }
                                        </Select>
                                    </FormControl>
                                </Grid >
                              
    
                                <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                    <Button variant="contained"
                                        type="submit"
                                        fullWidth
                                    >
                                        Actualizar Empresa
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
            </Grid>
        )
    }
        
    
   
}

export default FormularioModificar;