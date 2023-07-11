import { Alert, Box, Button, Card, Grid, Input, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";

import Swal from "sweetalert2";
import clienteAxios from "../../../../helpers/clienteaxios";



const SubirArchivo = ({id})=>{
    const [open, setOpen] = useState(false);
    const [archivo,setArchivo] = useState(null);
    const [extension,setExtension] = useState(null)
    const [isPdf, setPdf] = useState(true)
    const onSubmit = async(e)=>{

        e.preventDefault();

        const formData = new FormData();


        formData.append("tipo_archivo",extension);
        formData.append("id_bitacora",Number(id))
        formData.append("archivo",archivo)


        const response = await clienteAxios.post("/archivojefe/create",formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        if(response.status==200){
            Swal.fire({
                title:"Registrado",
                text:"El pdf ha sido registrado correctamente",
                icon:"success",
                confirmButtonText:"Aceptar"
                

            })
            setTimeout(()=>{
                window.location.reload();
            },2000)
        }

    }

    const handleArchivoSeleccionado = (e)=>{
    
        if(e.target.files[0].name.includes(".pdf")){
            setPdf(false);
            setArchivo(e.target.files[0]);
            setExtension(e.target.files[0].name.split(".")[1])
        }else{
                setPdf(true);
                Swal.fire({
                    title:"Error",
                    text:"El tipo de archivo no es pdf",
                    icon:"error",
                    confirmButtonText:"Aceptar"
                })
                setTimeout(()=>{
                },2000)
        
        }
        
        
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
      };
    return (
        <>
        <Grid sx={{display:"flex",margin:"0px auto", marginTop:"15px"}}>
            <Typography variant="h5">Listado de archivos</Typography>
            <Button variant="contained" sx={{marginLeft:"10px"}} onClick={handleOpen}  >Subir archivo</Button>
        </Grid>
       
            <Modal sx={{zIndex:2}} open={open}  onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: "40%",
                        bgcolor: 'background.paper',
                        maxHeight: '80vh',
                        boxShadow: 24,
                        overflow:"auto",
                        p: 4,
                        }}
                >
                    <form action="" onSubmit={onSubmit} style={{width:"100%",margin:"0px auto",display:"flex",flexDirection:"column"}}>
              
                        <Typography variant="h5" sx={{textAlign:"center",marginTop:"5px",marginBottom:"10px"}}>Subir Archivo</Typography>
                
                            <Grid container sx={{width:"100%",display:"flex",justifyContent:"center"}} >
                                <Grid item xs={11} xl={7} lg={10} md={6} sm={10} >
                                    <TextField required type="file" onChange={handleArchivoSeleccionado}
                                    fullWidth />
                                    <Alert sx={{marginTop:"5px"}} severity="info">Por favor subir archivos .pdf</Alert>    
                                </Grid>
                                
                                <Grid item xs={11} xl={7} lg={10} md={6} sm={10} sx={{marginTop:"10px"}}>
                                    <Button disabled={isPdf} sx={{display:"block",margin:"0px auto"}} type="submit" variant="contained">Enviar archivo</Button>
                                </Grid>
                            </Grid>
                       
                        </form>
                    </Box>
            </Modal>
        </>
    )
}


export default SubirArchivo;