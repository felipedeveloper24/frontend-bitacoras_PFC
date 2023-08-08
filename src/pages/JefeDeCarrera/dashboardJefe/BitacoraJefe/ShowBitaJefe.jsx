import React from "react";
import clienteAxios from "../../../../helpers/clienteaxios";
import { useQuery } from "react-query";
import { Box, Button, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate, useParams } from 'react-router-dom';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Swal from 'sweetalert2';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { DocumentScanner, Image } from "@mui/icons-material";

const ShowBitaJefe = () => {
  const { id } = useParams();
  const id_usuario  = localStorage.getItem("id_usuario");

  const { data, status, refetch } = useQuery("bitacorajefe", async () => {
    const response = await clienteAxios.post(`/bitacorajefe/getAll`,{
        id_usuario:id_usuario
    });
    
    // console.log(response.data)
    return response.data;
  }, {
    refetchOnWindowFocus: false
  });

  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/detailsbitacorajefe/${id}`);
  }
  //Implementación una función para manejar la eliminación de bitácoras
  const BitacoraDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        // La función de callback se ejecutará si el usuario hace clic en "Aceptar"
        //const response = await axios.delete(`${BASE_API}/${id}`);
        const response = await clienteAxios.delete(`/bitacorajefe/delete/${id}`);
        if (response.status === 200) {

          Swal.fire({
            title: "Eliminado",
            text: "La bitácora ha sido eliminada correctamente",
            icon: "success",
            confirmButtonText: "Aceptar"
          })
          setTimeout(() => {
            Swal.close()
            refetch()
           
          }, 2000)
        } else {
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error al eliminar la bitácora",
            icon: "error",
            confirmButtonText: "Aceptar"
          })
        }

      }
    });
  }

  const BitacoraEdit = (id) => {
    navigate(`/modificarbitacorajefe/${id}`);
  }

  const formato = (texto) => {
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
  }

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: '0px auto', marginTop: '300px' }}>
        <Typography variant="h5">Por favor, espera. Cargando datos...</Typography>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'error') {
    return <Typography variant="h5">Error al obtener las bitácoras</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{

  
      marginBottom: '15px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Centrado vertical
      // Ocupar al menos toda la altura de la pantalla
    }}>
      <Box
        sx={{
          
          display: 'flex',
          marginBottom: '10px',
          justifyContent: 'center', // Centrado horizontal
          alignItems: 'center', // Centrado vertical
          color: 'inherit',
          marginTop: '10px',
          '&:hover': {
            color: 'orange',
            cursor: 'none',
          },
        }}
      >
        
        <Typography variant="h3" style={{fontSize:35,marginTop:"20px", display:"flex",justifyContent:"center",alignItems:"center"}} >
          Bitácoras
          <ContentPasteGoIcon style={{ fontSize: 35}} color="inherit" />
        </Typography>
        
        
      </Box>
      {!data.bitacojefe ? (
        <>
        
        <Typography variant="h5">No hay bitácoras disponibles.</Typography>
        <Button  onClick={()=>{navigate("/bitacorajefe")}} variant="contained">Haz click Aquí para crear una bitácora</Button>
        </>
      ) : (
        <>
        <Button variant="contained" onClick={()=>{navigate("/bitacorajefe")}} sx={{marginBottom:"15px"}}>Crear Bitácoras</Button>
       
        <TableContainer 
          // border: '1px solid black', // Agrega un borde
          component={Paper} sx={{width:"90%",margin:"0px auto",marginBottom:"10px",maxHeight: 350}}// Para centrar horizontalmente
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Título</strong></TableCell>
                <TableCell><strong>Fecha Creación </strong> </TableCell>
                <TableCell ><strong>Estado Bitácora</strong></TableCell>
                <TableCell > <strong>Tipo Bitácora</strong></TableCell>
                <TableCell> <strong>Acciones</strong></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {data.bitacojefe.map((bitacora, idx) => (
                <TableRow key={idx} >
                  <TableCell style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{bitacora.titulo}</TableCell>
                  <TableCell>{formato(bitacora.fecha_creacion.split("T")[0])}</TableCell>
                  <TableCell >{bitacora.estado_bitacora.nombre_estado_bitacora}</TableCell>
                  <TableCell >{bitacora.tipo_bitacora.nombre_tipo_bitacora} </TableCell>

                  <TableCell >
                  <IconButton onClick={() => handleNavigate(bitacora.id_bitacora)}>
                     
                      <Tooltip title="Ver detalle bitácora">
                        <VisibilityIcon />
                      </Tooltip>
                    </IconButton>
                    <IconButton onClick={() => BitacoraEdit(bitacora.id_bitacora)}>
                      <Tooltip title="Modificar bitácora">
                        <ModeEditOutlineIcon />
                      </Tooltip>
                    </IconButton>
                    <IconButton onClick={() => BitacoraDelete(bitacora.id_bitacora)}>
                      <Tooltip title="Eliminar bitácora">
                         <DeleteIcon />
                      </Tooltip>
                     
                    </IconButton>
                    <IconButton onClick={() => navigate(`/archivosbitacorajefe/${bitacora.id_bitacora}`)}>
                      <Tooltip title="Documentos Bitacora">
                         <DocumentScanner/>
                      </Tooltip>
                     
                    </IconButton>
                    <IconButton onClick={() => navigate(`/imagenesbitacorajefe/${bitacora.id_bitacora}`)}>
                      <Tooltip title="Imágenes Bitácora">
                         <Image/>
                      </Tooltip>
                     
                    </IconButton>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </>
      )}
      
    </Container>
  );

};

export default ShowBitaJefe;