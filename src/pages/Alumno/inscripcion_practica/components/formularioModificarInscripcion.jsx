import { Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { School } from "@mui/icons-material";


const FormularioModificarInscripcion = ()=>{
    const [fecha_inicio, setFechaInicio] = useState("");
    const [id_representante,setidrepresentante] = useState("");
    const [fecha_fin, setFechaFin] = useState("")
    const [select_modalidad, setSelectModalidad] = useState("");
    const [select_oferta, setSelectOferta] = useState(0);
    const [oferta,setOferta] = useState("");
    const [datos_evaluador,setDatosEvaluador] = useState(1)
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [data,setData] = useState({});
    const [loading,setLoading] = useState(true);
    const id_inscribe = localStorage.getItem("id_inscribe");
    const navigate = useNavigate();
    const modalidades = useQuery("modalidades",async()=>{
        const response = await clienteAxios.get("/inscripcion/modalidades");
        if(response.status == 200){
            return response.data.modalidades
        }
    })
    const handleOferta = (event) => {
        setSelectOferta(event.target.value);
    }
    const ofertas = useQuery("ofertas",async()=>{
        const response = await clienteAxios.get("/oferta/getall");
        return response.data.ofertas;
    })
   
    
   const getinscripcion = async()=>{
        const response_peticion = await clienteAxios.get(`/inscripcion/show/${id_inscribe}`)
        if(response_peticion.status==200){
            const response = response_peticion.data.inscripcion;
            const inicio = response.fecha_inicio.split("T")[0];
            const fin = response.fecha_fin.split("T")[0];
            setFechaInicio(inicio)
            setFechaFin(fin)
            setSelectModalidad(response.id_modalidad)
            
            if(response.id_oferta == null){
                setSelectOferta(0)
                setOferta("")
            }else{
                setSelectOferta(1)
                setOferta(response.id_oferta)
            }
            
            if(response.representante != null){
                setidrepresentante(response.representante.id_representante)
                setNombre(response.representante.nombre)
                setApellido(response.representante.apellido)
                setCorreo(response.representante.correo)
                setTelefono(response.representante.telefono)
            }
        }    
   }
   const onSubmit = async(e)=>{
        e.preventDefault();


        var fechaHoy = new Date();
        var año = fechaHoy.getFullYear().toString()
        var mes = ('0' + (fechaHoy.getMonth() + 1)).slice(-2); // Los meses en JavaScript van de 0 a 11, por lo tanto, se suma 1
        var dia = ('0' + fechaHoy.getDate()).slice(-2);

        // Formato de fecha yy/mm/dd
        var fechaActual = año + '-' + mes + '-' + dia;
   
         if(select_oferta == 1 && datos_evaluador == 1){
            //Caso con todo los campos
        
            const data_evaluador = {
                nombre:nombre,
                apellido:apellido,
                telefono:telefono,
                correo:correo
            }

            if(id_representante == ""){
                const response = await clienteAxios.post("/representante/create",data_evaluador);
                if(response.status==200){
          
                    const data_inscripcion = {
                        fecha_inscripcion_practica:fechaActual,
                        fecha_inicio:fecha_inicio,
                        fecha_fin:fecha_fin,
                        id_modalidad:select_modalidad,
                        id_oferta:Number(oferta),
                        id_inscribe:Number(id_inscribe),
                        id_estado_inscripcion:1,
                        id_representante:Number(response.data.representante.id_representante)
                    }
               
                    const response_inscripcion = await clienteAxios.put(`/inscripcion/actualizaralumno/${id_inscribe}`,data_inscripcion);
                    console.log(response_inscripcion.data)
                    if(response_inscripcion.status==200){
                        
                        Swal.fire({
                            title:"Registrada",
                            text:"La inscripción ha sida actualizada correctamente",
                            icon:"success",
                            confirmButtonText:"Aceptar",
                        })
                        setTimeout(()=>{
                            Swal.close();
                            navigate(`/detalleinscripcion/${id_inscribe}`)
                        },2000)
                    }
                }
            }
            else{
                const response = await clienteAxios.put(`/representante/update/${id_representante}`,data_evaluador);
                if(response.status==200){
                   
                    const data_inscripcion = {
                        fecha_inscripcion_practica:fechaActual,
                        fecha_inicio:fecha_inicio,
                        fecha_fin:fecha_fin,
                        id_modalidad:select_modalidad,
                        id_oferta:Number(oferta),
                        id_inscribe:Number(id_inscribe),
                        id_estado_inscripcion:1,
                        id_representante:Number(response.data.representante.id_representante)
                    }
                    console.log(data_inscripcion)
               
                    const response_inscripcion = await clienteAxios.put(`/inscripcion/actualizaralumno/${id_inscribe}`,data_inscripcion);
                    if(response_inscripcion.status==200){
                        
                        Swal.fire({
                            title:"Registrada",
                            text:"La inscripción ha sida actualizada correctamente",
                            icon:"success",
                            confirmButtonText:"Aceptar",
                        })
                        setTimeout(()=>{
                            Swal.close();
                            navigate(`/detalleinscripcion/${id_inscribe}`)
                        },2000)
                    }
                }
               
            }
           
            
        }else if (select_oferta == 0 && datos_evaluador == 1){
            const data_evaluador = {
                nombre:nombre,
                apellido:apellido,
                telefono:telefono,
                correo:correo
            }
            if(id_representante==""){
                const response = await clienteAxios.post(`/representante/create`,data_evaluador)
                if(response.status==200){
                  
                    const data_actualizada = {
                        fecha_inscripcion_practica:fechaActual,
                        fecha_inicio:fecha_inicio,
                        fecha_fin:fecha_fin,
                        id_modalidad:select_modalidad,
                        id_oferta:null,
                        id_representante: Number(response.data.representante.id_representante),
                        id_inscribe:Number(id_inscribe),
                        id_estado_inscripcion:1,
                    }
                    
                    const response_inscripcion = await clienteAxios.put(`/inscripcion/actualizaralumno/${id_inscribe}`,data_actualizada);
                    if(response_inscripcion.status==200){
                        
                        Swal.fire({
                            title:"Registrada",
                            text:"La inscripción ha sida actualizada correctamente",
                            icon:"success",
                            confirmButtonText:"Aceptar",
                        })
                        setTimeout(()=>{
                            Swal.close();
                            navigate(`/detalleinscripcion/${id_inscribe}`)
                        },2000)
                    }
                }
            }else{
                const response = await clienteAxios.put(`/representante/update/${id_inscribe}`,data_evaluador)
                if(response.status==200){
                  
                    const data_actualizada = {
                        fecha_inscripcion_practica:fechaActual,
                        fecha_inicio:fecha_inicio,
                        fecha_fin:fecha_fin,
                        id_modalidad:select_modalidad,
                        id_oferta:null,
                        id_representante: Number(id_representante),
                        id_inscribe:Number(id_inscribe),
                        id_estado_inscripcion:1,
                    }
                    
                    const response_inscripcion = await clienteAxios.put(`/inscripcion/actualizaralumno/${id_inscribe}`,data_actualizada);
                    if(response_inscripcion.status==200){
                        
                        Swal.fire({
                            title:"Registrada",
                            text:"La inscripción ha sida actualizada correctamente",
                            icon:"success",
                            confirmButtonText:"Aceptar",
                        })
                        setTimeout(()=>{
                            Swal.close();
                            navigate(`/detalleinscripcion/${id_inscribe}`)
                        },2000)
                    }
                }
            }
           
           

        }
            
   }

    useEffect(()=>{
        getinscripcion()
     
    },[])

    return (
        <form style={{width:"75%",margin:"0px auto",marginTop:"10px",marginBottom:"10px"}} onSubmit={onSubmit}>
            <Typography variant="h5" sx={{textAlign:"center",marginBottom:"15px",justifyContent:"center",display:"flex",alignItems:"center"}}>Modificar Inscripción <School style={{marginLeft:"5px"}}/> </Typography>
        <Card sx={{padding:"20px",backgroundColor:"#f4f5f7"}}>
            <Grid container spacing={2}>
                <Grid item  xs={11} xl={6} lg={6} md={6} sm={10}>
                    <TextField sx={{backgroundColor:"white"}} required label="Fecha Inicio" value={fecha_inicio} onChange={(e)=>{setFechaInicio(e.target.value)}} InputLabelProps={{shrink:true}} type="date" fullWidth />
                </Grid>
                <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <TextField sx={{backgroundColor:"white"}} label="Fecha Fin" value={fecha_fin} required onChange={(e)=>{setFechaFin(e.target.value)}} type="date" InputLabelProps={{shrink:true}}  fullWidth />
                </Grid>
                <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel id="select-modalidad">Modalidad</InputLabel>
                            <Select sx={{backgroundColor:"white"}} id="select-modalidad" required onChange={(e)=>{setSelectModalidad(e.target.value)}} value={select_modalidad}  label="Modalidad" fullWidth>                            
                                {
                                    modalidades.status == "success" && modalidades.data.map((modalidad,idx)=>(
                                        <MenuItem value={modalidad.id_modalidad} key={idx} >{modalidad.nombre_modalidad}</MenuItem>
                                    ))
                                }
                            </Select>
                         </FormControl>
                </Grid>
                <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <FormControl variant="outlined" margin="normal" fullWidth>
                            <InputLabel htmlFor="select-oferta">¿Tiene oferta de práctica?</InputLabel>
                            <Select 
                            sx={{backgroundColor:"white"}}
                            required
                            id="select-oferta"
                            value={select_oferta} 
                            onChange={handleOferta} 
                            label="¿Tiene oferta de práctica?" 
                            fullWidth
                            >
                            <MenuItem value={1}>Si</MenuItem>
                            <MenuItem value={0}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {
                                select_oferta == 1 && (
                                    <Grid  item xs={11} xl={6} lg={6} md={6} sm={10}>
                                        <FormControl variant="outlined" margin="normal" fullWidth>
                                            <InputLabel htmlFor="select_practica">Oferta de práctica</InputLabel>
                                            <Select  required value={oferta} onChange={(e)=>{setOferta(e.target.value)}} id="select_practica" label="Oferta de práctica" sx={{marginTop:"10px",backgroundColor:"white"}}  fullWidth>
                                                {
                                                    ofertas.status=="success" && Array.isArray(ofertas.data) == true  && (
                                                    
                                                        ofertas.data.map((oferta,idx)=>(
                                                            <MenuItem value={oferta.id_oferta_practica} key={idx}>{oferta.descripcion}</MenuItem>
                                                        ))
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                   
                                )
                    }
                            
            </Grid>
            <Grid container spacing={2}>

                                <Grid item xs={12} xl={12} lg={12} md={12} sm={10} ><Typography variant="h6" sx={{textAlign:"center"}}>Datos evaluador</Typography></Grid>
                               
                               <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                   <TextField sx={{backgroundColor:"white"}} value={nombre} onChange={(e)=>{setNombre(e.target.value)}} required label="Nombre"  fullWidth/>
                               </Grid>
                               <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                   <TextField sx={{backgroundColor:"white"}} value={apellido} label="Apellido" onChange={(e)=>{setApellido(e.target.value)}} required fullWidth />
                               </Grid>
                               <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                   <TextField sx={{backgroundColor:"white"}} value={telefono} label="Teléfono" onChange={(e)=>{setTelefono(e.target.value)}} required fullWidth />
                               </Grid>
                               <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                   <TextField sx={{backgroundColor:"white"}} value={correo} label="Correo" type="email" onChange={(e)=>setCorreo(e.target.value)} required fullWidth />
                               </Grid>

                           </Grid>
                           <Grid item xs={11} xl={12} lg={12} md={12} sm={10} sx={{marginTop:"20px"}} >
                                <Button variant="contained" type="submit" sx={{margin:"0px auto",display:"block"}}>Enviar datos</Button>
                           </Grid>
                </Card>
        </form>
    )
}

export default FormularioModificarInscripcion;

