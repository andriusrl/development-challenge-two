import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const baseUrl = 'https://5kmnqpg37d.execute-api.us-east-1.amazonaws.com/default/update_patient'

export default function UpdatePatient() {

    const history = useHistory();

    
    const patient = JSON.parse(window.localStorage.getItem('patient'))
    
    const [form, setForm] = useState(patient || undefined)

    const updatePatient = async () => {
        try {
            await axios.post(
                `https://thingproxy.freeboard.io/fetch/${baseUrl}`,
                { form },
                // {
                //     headers: { 'Content-Type': 'application/json' }
                // }
            )
            console.log("Update com sucesso")
    
        } catch (error) {
            console.log("Erro no update")
            console.log(error)
            console.log(error.data)
            console.log(error.status)
            console.log(error.statusText)
        }
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     mode: "no-cors",
        //     body: JSON.stringify(form)
        // };
        // const resultado = fetch(`${baseUrl}`, requestOptions)
        //     .then(response => response.json())
        //     .then(data => this.setState({ postId: data.id }));
        // console.log(resultado)

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
                <Button variant="contained" onClick={()=>{updatePatient()}}>Atualizar cadastro</Button>
            </Stack>
        </Grid>
    );
}
