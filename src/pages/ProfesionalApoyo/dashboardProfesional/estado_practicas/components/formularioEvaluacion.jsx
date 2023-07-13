import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import clienteAxios from "../../../../../helpers/clienteaxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";




const FormularioEvaluacion = ({ id }) => {

    const [id_inscripcion, setInscripcion] = useState({});
    const [observaciones, setObservaciones] = useState("");
    const [nota_final, setNotaFinal] = useState();
    const [loading, setLoading] = useState(true)
    const getInscripcion = async () => {
        const response = await clienteAxios.get(`/inscripcion/show/${id}`);
        if (response.status == 200) {
            setInscripcion(response.data.inscripcion.id_inscripcion_practica)
            setObservaciones(response.data.inscripcion.observaciones);
            setNotaFinal(response.data.inscripcion.nota_final)
            setLoading(false);
        }
    }
    const navigate = useNavigate();
    useEffect(() => {
        getInscripcion();
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await clienteAxios.post("/inscripcion/updatevaluacion", {
            id_inscripcion: id_inscripcion,
            nota_final: nota_final,
            observaciones: observaciones
        })

        if (response.status == 200) {
            Swal.fire({
                title: "Evaluada",
                text: "La inscripción ha sido evaluada correctamente",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                    container: "sweetalert_container"
                }
            })

            setTimeout(() => {
                Swal.close()
                navigate(`/informaciongeneral/${id}`)
            }, 2000)
        }
    }

    const remainingChars = 1000- observaciones.length;
    const remainingCharsColor = remainingChars > 200 ? 'green' : remainingChars > 100 ? 'orange' : 'red';

    if (!loading) {
        return (
            <form style={{ width: "60%", margin: "0px auto" }} onSubmit={onSubmit}>
                <Card sx={{ padding: "15px" }}>
                    <Grid container spacing={2}>
                        <Grid item lg={12}>
                            <TextField
                                label="Observaciones"
                                fullWidth
                                value={observaciones}
                                multiline
                                rows={5}
                                onChange={(e) => { setObservaciones(e.target.value) }}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    maxLength: 1001,
                                }}
                            />
                            <p style={{ color: remainingCharsColor, fontSize: '15px', textAlign: 'center' }}>
                                {remainingChars >= 0 ? `Carácteres restantes: ${remainingChars}` : 'Has superado el límite de carácteres. Por favor, reduce tu observación.'}
                            </p>
                        </Grid>
                        <Grid item lg={12}>
                            <TextField label="Nota"
                                type="number"
                                value={nota_final}
                                onChange={(e) => { setNotaFinal(e.target.value) }}
                                inputMode="numeric"
                                inputProps={{
                                    min: 10,
                                    max: 70
                                }}
                                fullWidth />
                        </Grid>
                        <Grid item lg={12} sx={{ display: "flex" }}>
                            <Button sx={{ margin: "0px auto" }} type="submit" variant="contained"
                            disabled={remainingChars === -1}
                            >Enviar información</Button>
                        </Grid>
                    </Grid>
                </Card>

            </form>
        )
    }

}


export default FormularioEvaluacion;