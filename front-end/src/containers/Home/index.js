import React, { useEffect, useState } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import ButtonCustom from '../../styles/button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const baseUrlGetAllPatients = 'https://thingproxy.freeboard.io/fetch/https://ivcg8on2bb.execute-api.us-east-1.amazonaws.com/default/get_all_patients'
const baseUrlDeletePatient = 'https://thingproxy.freeboard.io/fetch/https://eii3sexcr3.execute-api.us-east-1.amazonaws.com/default/remove_patient'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const columns = [
    { field: 'id', headerName: 'id', width: 90 },
    { field: 'name', headerName: 'Nome', width: 130 },
    { field: 'last_name', headerName: 'Sobrenome', width: 200 },
    { field: 'cpf', headerName: 'CPF', width: 200 },
    { field: 'city', headerName: 'Cidade', width: 200 },
    // { field: 'age', headerName: 'Age', type: 'number', width: 90, },
];

export default function Home() {

    const history = useHistory();

    const [listPatients, setListPatients] = useState(undefined)
    const [rowSelected, setRowSelected] = useState(undefined)

    const auth = JSON.parse(window.localStorage.getItem('auth'))

    console.log(auth)

    const [openWarning, setOpenWarning] = useState(false);
    const [openLoading, setOpenLoading] = useState(false);
    const [openLoadingSucess, setOpenLoadingSucess] = useState(false);

    const goToPage = (page) => {
        window.localStorage.setItem("patient", JSON.stringify(rowSelected))
        history.push(`${page}`);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenWarning(false);
        setOpenLoading(false);
        setOpenLoadingSucess(false);
    };

    async function deletePatient (){
        try {
            setOpenLoading(true)
            await axios.post(
                `${baseUrlDeletePatient}`,
                { id: rowSelected.id },
                { headers : {
                    Authorization: auth.token
                }}
            )
            setOpenLoadingSucess(true)
            getAllPatients()

        } catch (error) {
            console.log("Erro ao deletar")
            console.log(error)
            console.log(error.data)
            console.log(error.status)
            console.log(error.statusText)
        }
    }

    async function getAllPatients (){       

        try {
            // openLoading(true)
            console.log(baseUrlGetAllPatients)
            const response = await axios.post(
                baseUrlGetAllPatients,null,
                { headers : {
                    Authorization: auth.token
                }}
            )
            setListPatients(response.data.results)

        } catch (error) {
            console.log("Erro ao fazer login")
            console.log(error)
            console.log(error.data)
            console.log(error.status)
            console.log(error.statusText)
            goToPage("/login")
        }
    }

useEffect(() => {
    getAllPatients()
}, [])

return (
    <Grid
        container
        // justifyContent="center"
        // alignItems="center"
        // // spacing={2}
        direction="column"
    >
        <Snackbar open={openWarning} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                Selecione um paciente!
            </Alert>
        </Snackbar>
        <Snackbar open={openLoading} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                Deletando paciente, aguarde!
            </Alert>
        </Snackbar>
        <Snackbar open={openLoadingSucess} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Paciente deletado!
            </Alert>
        </Snackbar>
        <Grid
            container
            alignItems="center"
            direction="column"
        >
            <Typography variant="h4" gutterBottom component="div">
                Página inicial
            </Typography>
        </Grid>
        <Stack spacing={2} direction="row" justifyContent="center">
            <ButtonCustom variant="contained" onClick={() => { goToPage("/cadastrar") }} >Cadastrar</ButtonCustom>
            <ButtonCustom variant="contained" onClick={() => { rowSelected ? goToPage("/atualizar") : setOpenWarning(true) }} >Editar</ButtonCustom>
            <ButtonCustom variant="contained" onClick={() => { deletePatient() }} >Deletar</ButtonCustom>
        </Stack>

        {
            listPatients ?
                <div>
                    <DataGrid
                        rows={listPatients}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        autoHeight
                        autoWidth
                        autoPageSize
                        // checkboxSelection
                        isRowSelectable={(params) => { setRowSelected(params.row); console.log(params.row) }}
                        cellCheckbox
                    // checkboxSelection
                    />
                </div>
                :
                <div>Carregando...</div>
        }
    </Grid>
);
}
