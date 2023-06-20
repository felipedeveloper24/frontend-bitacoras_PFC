
import React from "react";
import { Grid, Typography } from "@mui/material";
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useState } from "react";
import {useNavigate } from "react-router-dom";

import logoubb from "../../assets/logoubb.png"
import { Output } from "@mui/icons-material";

const HeaderAlumno = ()=>{
    
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleToggleMenu = () => {
        setOpen(!open);
      };
      
    return(
        <Grid container sx={{width:"100%",display:"flex",backgroundColor:"#326FA6",height:"80px", alignItems:"center"}}>
             <Grid sx={{width:"10%",display:"flex",justifyContent:"center"}}>
                
                 <IconButton onClick={handleToggleMenu} sx={{marginLeft:"10px"}}>
                    <MenuIcon style={{color:"white"}} />
                </IconButton>  
                
                
             </Grid>
             <Grid sx={{width:"70%",marginLeft:"65px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <img style={{width:"130px"}} src={logoubb} />
            </Grid>
            <Drawer anchor="left" open={open}  width={300} onClose={handleToggleMenu}>
                <List sx={{width:"300px",backgroundColor:"#326FA6",color:"white",height:"100vh" ,display:"flex",flexDirection:"column",alignItems:"center"}} >
                    <ListItem button onClick={handleToggleMenu}>
                    <IconButton  onClick={handleToggleMenu}>
                        <MenuIcon  style={{color:"white"}} />
                    </IconButton>
                    </ListItem>
                    <ListItem button onClick={()=>navigate("/dashboard")} >
                        <ListItemText sx={{textAlign:"center"}} primary="Inicio" />
                    </ListItem>
                    <ListItem button onClick={()=>navigate("/perfil")}>
                        <ListItemText sx={{textAlign:"center"}} primary="Perfil" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText sx={{textAlign:"center"}} primary="Bitacoras" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText sx={{textAlign:"center"}} primary="Inscripción" />
                    </ListItem>
                    <ListItem button onClick={()=>navigate("/")} >
                         <ListItemText  sx={{textAlign:"center",display:"flex",flexWrap:"nowrap",justifyContent:"center",alignItems:"center"}}>
                               <p> Cerrar Sesión</p> <Output/>
                         </ListItemText>
                    </ListItem>
                </List>
            </Drawer>
        </Grid>
    )
};

export default HeaderAlumno;
