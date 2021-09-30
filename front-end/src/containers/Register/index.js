import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import axios from 'axios';

// const baseUrl = 'https://ivcg8on2bb.execute-api.us-east-1.amazonaws.com/default/get_all_patients'

export default function Register() {

    const patient = JSON.parse(window.localStorage.getItem('patient'))

    console.log(patient)

    // function getAllPatients() {
    //     axios.get(`${baseUrl}`)
    //         .then((response) => { setListPatients(response.data.results) })
    // }

    // useEffect(() => {
    //     getAllPatients()
    // }, [])

    // console.log(listPatients)

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
                Registro
            </Typography>
            <TextField id="name" label="Nome" variant="outlined" />
            <TextField id="lastName" label="Sobrenome" variant="outlined" />
            <TextField id="cpf" label="CPF" variant="outlined" />
            <TextField id="street" label="Rua" variant="outlined" />
            <TextField id="streetNumber" label="Numero" variant="outlined" />
            <TextField id="district" label="Bairro" variant="outlined" />
            <TextField id="cep" label="CEP" variant="outlined" />
            <TextField id="city" label="Cidade" variant="outlined" />
            <Stack spacing={2} direction="row">
                <Button variant="contained">Voltar</Button>
                <Button variant="contained">Atualizar cadastro</Button>
            </Stack>
        </Grid>
    );
}
