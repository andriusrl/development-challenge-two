import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useHistory } from "react-router-dom";

// const baseUrl = 'https://ivcg8on2bb.execute-api.us-east-1.amazonaws.com/default/get_all_patients'

export default function UpdatePatient() {

    const history = useHistory();

    
    const patient = JSON.parse(window.localStorage.getItem('patient'))
    
    const [form, setForm] = useState(patient || undefined)
    
    // console.log(patient)

    // function getAllPatients() {
    //     axios.get(`${baseUrl}`)
    //         .then((response) => { setListPatients(response.data.results) })
    // }

    // useEffect(() => {
    //     getAllPatients()
    // }, [])

    // console.log(listPatients)

    const update = () =>{

    }

    const setGeneralForm = (event) =>{
        const formCopy = form
        setForm({
            ...formCopy,
            [event.target.id]: event.target.value,
        })
    }

    console.log(form)

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
            <Typography variant="h3" gutterBottom component="div">
                Atualizar cadastro
            </Typography>
            <TextField id="name" label="Nome" variant="outlined" defaultValue={form.name} onChange={setGeneralForm} />
            <TextField id="last_name" label="Sobrenome" variant="outlined" defaultValue={form.last_name} onChange={setGeneralForm} />
            <TextField id="cpf" label="CPF" variant="outlined" defaultValue={form.cpf} onChange={setGeneralForm} />
            <TextField id="street" label="Rua" variant="outlined" defaultValue={form.street} onChange={setGeneralForm} />
            <TextField id="street_number" label="Numero" variant="outlined" defaultValue={form.street_number} onChange={setGeneralForm} />
            <TextField id="district" label="Bairro" variant="outlined" defaultValue={form.district} onChange={setGeneralForm} />
            <TextField id="cep" label="CEP" variant="outlined" defaultValue={form.cep} onChange={setGeneralForm} />
            <TextField id="city" label="Cidade" variant="outlined" defaultValue={form.city} onChange={setGeneralForm} />
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={()=>{goToPage('/')}} >Voltar</Button>
                <Button variant="contained">Atualizar cadastro</Button>
            </Stack>
        </Grid>
    );
}