import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { cpfMask } from '../../mask/maskCpf';

const baseUrl = 'https://thingproxy.freeboard.io/fetch/https://7tzui130j5.execute-api.us-east-1.amazonaws.com/default/insert_patient'

export default function InsertPatient() {

    const history = useHistory();

    const [form, setForm] = useState({
        name: "",
        last_name: "",
        cpf: "",
        street: "",
        street_number: "",
        district: "",
        cep: "",
        city: ""
    })

    const insertPatient = async () => {
        try {
            let res = await axios.post(
                `${baseUrl}`,
                form 
            )
            console.log(res)
            console.log(res.data)
            console.log("Cadastrado com sucesso")

        } catch (error) {
            console.log("Erro no insert")
            console.log(error)
            console.log(error.data)
            console.log(error.status)
            console.log(error.statusText)
        }
    }

    const setGeneralForm = (event) => {
        const formCopy = form
        setForm({
            ...formCopy,
            [event.target.id]: `${event.target.id === 'cpf' ? cpfMask(event.target.value) : event.target.value}`,
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
                Cadastro de paciente
            </Typography>
            <Stack spacing={2}>
                <TextField id="name" label="Nome" variant="outlined" value={form.name} onChange={setGeneralForm} />
                <TextField id="last_name" label="Sobrenome" variant="outlined" value={form.name_name} onChange={setGeneralForm} />
                <TextField id="cpf" label="CPF" variant="outlined" value={form.cpf} onChange={setGeneralForm} />
                <TextField id="street" label="Rua" variant="outlined" value={form.street} onChange={setGeneralForm} />
                <TextField id="street_number" label="Numero" type="number" variant="outlined" value={form.street_number} onChange={setGeneralForm} />
                <TextField id="district" label="Bairro" variant="outlined" value={form.district} onChange={setGeneralForm} />
                <TextField id="cep" label="CEP" variant="outlined" value={form.cep} onChange={setGeneralForm} />
                <TextField id="city" label="Cidade" variant="outlined" value={form.city} onChange={setGeneralForm} />
            </Stack>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={() => { goToPage('/') }} >Voltar</Button>
                <Button variant="contained" onClick={() => { insertPatient() }}>Cadastrar paciente</Button>
            </Stack>
        </Grid>
    );
}
