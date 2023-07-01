import { Alert, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import { Delete, Download } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useState } from "react";
import FileSaver from "file-saver";



const MostrarArchivos = ({id})=>{

    const [archivos,setArchivos] = useState([]);
    const getArchivos = useQuery("archivos", async()=>{
        const response = await clienteAxios.get(`/archivoinscripcion/getall/${id}`)
        if(response.status==200){
            if(response.data.archivos){
                const pdfsData = response.data.archivos;
                const Urls = pdfsData.map((pdf,index)=>{
                    const pdfData = new Uint8Array(pdf.archivo.data);
                    const pdfBlob = new Blob([pdfData],{type:'application/pdf'});
                    console.log(pdfBlob);
                    return { blob: pdfBlob, nombre: `${pdf.nombre}`, id_archivo: pdf.id_archivo };
                })
                setArchivos(Urls)
            }
           
            return response.data;
        }
        
    })
    const downloadPdf = (pdfBlob, pdfName) => {
        FileSaver.saveAs(pdfBlob, pdfName);
    };
    
    const eliminar_archivo = async(id)=>{
        Swal.fire({
            title: '¿Estás seguro si quieres eliminar el archivo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText:"Cancelar"
        }).then(async(result) =>{
            if(result.isConfirmed){
                const response = await clienteAxios.delete(`/archivoinscripcion/delete/${id}`);
                if(response.status==200){
                    Swal.fire({
                        title:"Eliminado",
                        text:"El archivo ha sido eliminado correctamente",
                        icon:"success",
                        confirmButtonText:"Aceptar"
                    })
                    setTimeout(()=>{
                        window.location.reload()
                    },2000)
                   
                }
            }
        });
    }
    if(getArchivos.status == "success" && !getArchivos.data.archivos){
        return (
            
            <Grid sx={{width:"100%",display:"flex", flexDirection:"column"}}>

                <TableContainer component={Paper} sx={{width:"90%",margin:"0px auto",marginTop:"10px"}}>
                <Table stickyHeader sx={{ minWidth: 650,maxHeight:300 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Id archivo</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                    </TableHead>
                </Table>
                <Alert severity="error"  sx={{margin:"0px auto",marginTop:"10px",marginBottom:"10px",width:"40%",textAlign:"center"}}>No hay archivos registrados</Alert>
                </TableContainer>
            </Grid>
        )
    }
    if(getArchivos.status == "success" && getArchivos.data.archivos){
        return (
            <Grid sx={{width:"100%",display:"flex", flexDirection:"column"}}>
           
                <TableContainer component={Paper} sx={{width:"50%",margin:"0px auto",marginTop:"10px"}}>
                <Table stickyHeader sx={{ minWidth: 500,maxHeight:300 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>

                        <TableCell>Acciones</TableCell>
                    </TableRow>
                    </TableHead>
             
                <TableBody>
                     {
                        archivos.map((archivo,idx)=>(
                            <TableRow key={idx}>
                           
                                <TableCell>{archivo.nombre}</TableCell>
                              
                                <TableCell>
                                    <Download sx={{cursor:"pointer"}} onClick={()=>downloadPdf(archivo.blob,archivo.nombre)} />
                                    <Delete sx={{cursor:"pointer"}} onClick={()=>{eliminar_archivo(archivo.id_archivo)}} />
                                </TableCell>
                            </TableRow>
                        ))
                     }
                </TableBody>
                </Table>
                </TableContainer>
            </Grid>
        )
    }
    if(getArchivos.status == "loading"){
        <Grid sx={{width:"35%",margin:"0px auto",marginTop:"20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            Cargando datos.........
            <CircularProgress/>
        </Grid>
    }
   
}



export default MostrarArchivos;