import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Header from '../../components/Header';

const baseUrl = 'https://thingproxy.freeboard.io/fetch/https://ymgzlcsi82.execute-api.us-east-1.amazonaws.com/default/signin'

export default function Login() {

    localStorage.clear();

    const history = useHistory();

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const login = async () => {
        try {
            let res = await axios.post(
                `${baseUrl}`,
                form
            )
            console.log(res)
            console.log(res.data)
            console.log("Logado com sucesso")
            window.localStorage.setItem("auth", JSON.stringify(res.data.results))
            goToPage('/')
        } catch (error) {
            console.log("Erro no login")
            console.log(error)
            console.log(error.data)
            console.log(error.status)
            console.log(error.statusText)
        }
    }

    const setGeneralForm = (event) => {
        const formCopy = form
        console.log(event.target.id)
        console.log(event.target.value)
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
            <Header pageTitle="Desconectado" />
            <Stack spacing={2}>
                <TextField size="small" required id="email" label="E-mail" variant="filled" value={form.email} onChange={setGeneralForm} />
                <TextField size="small" required id="password" label="Senha" variant="filled" value={form.password} onChange={setGeneralForm} />            
                <Button variant="contained" onClick={() => { login() }}>ENTRAR</Button>
            </Stack>
        </Grid>
    );
}
