import { Typography,Grid } from "@mui/material"
import HeaderProfesional from "../../../../components/headers/headerProfesional";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import FormularioModificar from "./components/formularioModificar";
import { useEffect, useState } from "react";


const ModificarEmpresa = ()=>{
    const {id} = useParams();

    const [empresa,setEmpresa] = useState({});
    const [loading,setLoading] = useState(true);

    const getEmpresa = async()=>{
        const response = await clienteAxios.get(`/empresa/show/${id}`);
        if(response.status==200){
            setEmpresa(response.data.empresa)
            setLoading(false)
        
        }
    };

    useEffect(()=>{
        getEmpresa();
    },[])
    if(!loading){
        return (
            <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
                <HeaderProfesional/>
                <Typography variant="h5" sx={{textAlign:"center",marginTop:"10px",marginBottom:"10px"}} >Empresa seleccionada: {empresa.razon_social} </Typography>
                <FormularioModificar  empresa={empresa}  />
            </Grid>
        )
    }   
    
}

export default ModificarEmpresa;
