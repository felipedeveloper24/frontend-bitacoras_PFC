import {  Grid,Button, Box,TextField,Typography, Modal, MenuItem, InputLabel, Alert, FormControl } from "@mui/material"
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "@mui/material/Select";
import { useQuery } from "react-query";
import clienteAxios from "../../../../../helpers/clienteaxios";

const FormularioModificar = ({empresa})=>{
    
    //let valor_centro = empresa.centro_practica == true ? 1 : 0
    //setCentroPractica(valor_centro) 

    const [open, setOpen] = useState(false);
   // const [selectedValue, setSelectedValue] = useState(centro_practica);
    const [region,setRegion] = useState("");

    const [rut_empresa,setRut] = useState("");
    const [razon_social,setRazonSocial] = useState("");
    const [direccion,setDireccion] = useState("");
    const [centro_practica,setCentroPractica] = useState(empresa.centro_practica);

    const getRegionComuna = useQuery("region",async()=>{
        const response = await clienteAxios.post("comuna/getRegion",{
            id_comuna: empresa.id_comuna
        })
        
        return response.data.region.id_region;
    })
    

    const {register,handleSubmit,formState:{errors},control,reset} = useForm({
        defaultValues:{
            rut_empresa: "",
            razon_social: "",
            direccion: "",
            telefono: "",
            correo: "",
            id_estado_empresa:"",
            id_comuna:"",
            region: ""
        }
    });
    const [comunas,setComunas] = useState([]);
    const [comuna,setComuna] = useState("");
    
    const handleComuna = (event)=>{
        setComuna(event.target.value);
    }

    useEffect(()=>{
        if(empresa){
            
            setRut(empresa.rut_empresa)
            setRazonSocial(empresa.razon_social)
            setDireccion(empresa.direccion);
             reset({
                telefono:empresa.telefono,
                correo:empresa.correo,
                centro_practica: centro_practica,
                region: getRegionComuna.status=="success" && getRegionComuna.data
                
             })
           
            
        }
    },[empresa, reset])

    const handleRegion = (event)=>{
        const id = event.target.value;
       
        const actualiza = getcomunas.status=="success" && getcomunas.data.filter((comuna)=>{
            return comuna.id_region === id; 
        })
        setComunas(actualiza);
    
        setRegion(event.target.value);
    }
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const regiones = useQuery("regiones", async()=>{
        const response = await clienteAxios.get("/comuna/getall");
        //console.log(response.data.regiones);
        return response.data.regiones
    });

    const getcomunas = useQuery("comunas", async()=>{
        const response = await clienteAxios.get("/comuna/getComunas");
        return response.data.comuna;
    })
    const getEstados = useQuery("estados",async()=>{
       const response = await clienteAxios.get("/estadoempresa/getall");
       return response.data.estados;
    })

  

    const onSubmit = (data)=>{
        const data_oficial = {
            rut_empresa: rut_empresa,
            razon_social: data.razon_social,
            direccion:data.direccion,
            centro_practica: selectedValue == 1 ? true: false,
            correo: data.correo,
            telefono: data.telefono,
            id_comuna: comuna,
            id_estado_empresa: 1

        }
        console.log(data_oficial)
    }

    return (
        <Grid sx={{width:"75%",margin:"0px auto"}}>
           <form method="POST" onSubmit={handleSubmit(onSubmit)}>
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
                                        <Select required      
                                            fullWidth >
                                            <MenuItem value="">Seleccione</MenuItem>
                                            <MenuItem value={1}>Si</MenuItem>
                                            <MenuItem value={0}>No</MenuItem>
                                        </Select>
                                </FormControl>      
                            </Grid>

                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                        <TextField label="Correo" fullWidth />
                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                    <TextField label="Teléfono" fullWidth/>
                            </Grid>

                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <FormControl margin="normal" fullWidth>
                                <InputLabel>Region</InputLabel>
                                
                                        <Select fullWidth >
                                            {
                                                regiones.status == "success" && regiones.data.map((region,idx)=>{
                                                    return (
                                                        <MenuItem key={idx} value={region.id_region} >{region.nombre_region}</MenuItem>
                                                    )
                                                })
                                            }
                                    </Select>
                                </FormControl>
                                
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
                                                getcomunas.status == "success" && comunas.map((comuna,idx)=>{
                                                    return (
                                                        <MenuItem key={idx} value={comuna.id_comuna} >{comuna.nombre}</MenuItem>
                                                    )
                                                })
                                            }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <FormControl label="Estado Empresa" margin="normal" fullWidth>
                                    <InputLabel>Estado Empresa</InputLabel>
                                    <Select 
                                            
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

export default FormularioModificar;