import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { cpfMask } from '../../mask/maskCpf';
import ButtonCustom from '../../styles/button';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const baseUrl = 'https://5kmnqpg37d.execute-api.us-east-1.amazonaws.com/default/update_patient'

export default function UpdatePatient() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const patient = JSON.parse(window.localStorage.getItem('patient'))
    const [form, setForm] = useState(patient || undefined)
    const auth = JSON.parse(window.localStorage.getItem('auth'))

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setLoading(false)
        setOpen(false);
    };

    const updatePatient = async () => {
        try {
            setLoading(true)
            const res = await axios.post(
                `https://thingproxy.freeboard.io/fetch/${baseUrl}`,
                form,
                { headers : {
                    Authorization: auth.token
                }}
            )
            console.log(res)
            console.log(res.data)
            console.log("Atualizado!")
            setOpen(true)

        } catch (error) {
            console.log(error)
            console.log(error.data)
            console.log(error.status)
            console.log(error.statusText)
        }
    }

    const setGeneralForm = (event) => {
        const formCopy = form
        console.log(event.target.id)
        setForm({
            ...formCopy,
            [event.target.id]: `${event.target.id === 'cpf' ? cpfMask(event.target.value) : event.target.value}`,
        })
    }

    // console.log(form)

    const goToPage = (page) => {
        history.push(`${page}`);
    }

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            // spacing={2}
            direction="column"
            // autoHeight
            // autoPageSize
        >
            <Snackbar open={loading} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    Atualizando cadastro, aguarde...
                </Alert>
            </Snackbar>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Paciente atualizado com sucesso!!
                </Alert>
            </Snackbar>
            <Typography variant="h4" gutterBottom component="div">
                Atualizar cadastro
            </Typography>
            <Stack spacing={2}>
                <TextField id="name" label="Nome" variant="filled" defaultValue={form.name} onChange={setGeneralForm} />
                <TextField id="last_name" label="Sobrenome" variant="filled" defaultValue={form.last_name} onChange={setGeneralForm} />
                <TextField id="cpf" label="CPF" variant="filled" defaultValue={form.cpf} onChange={setGeneralForm} />
                <TextField id="street" label="Rua" variant="filled" defaultValue={form.street} onChange={setGeneralForm} />
                <TextField id="street_number" label="Numero" variant="filled" defaultValue={form.street_number} onChange={setGeneralForm} />
                <TextField id="district" label="filled" variant="filled" defaultValue={form.district} onChange={setGeneralForm} />
                <TextField id="cep" label="CEP" variant="filled" defaultValue={form.cep} onChange={setGeneralForm} />
                <TextField id="city" label="Cidade" variant="filled" defaultValue={form.city} onChange={setGeneralForm} />
                <Stack spacing={2} direction="row">
                    <ButtonCustom variant="contained" onClick={() => { goToPage('/') }} >Voltar</ButtonCustom>
                    <ButtonCustom variant="contained" onClick={() => { updatePatient() }}>Atualizar cadastro</ButtonCustom>
                </Stack>
            </Stack>
        </Grid>
    );
}
