import React, { useEffect, useState } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import ButtonCustom from '../../styles/button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Header from '../../components/Header';


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
            error?.response?.status == 401 && goToPage("/login")
        }
    }

    async function getAllPatients (){       

        try {
            auth?.token === undefined && goToPage("/login")
            console.log( auth?.token)
            const response = await axios.post(
                baseUrlGetAllPatients,null,
                { headers : {
                    Authorization: auth.token
                }}
            )
            setListPatients(response.data.results)

        } catch (error) {
            console.log(error?.response)
            console.log(error?.response?.status)
            error?.response?.status == 401 && goToPage("/login")
        }
    }

useEffect(() => {
    getAllPatients()
}, [])

return (
    <Grid
        container
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

        <Header pageTitle="Lista de pacientes" />
        
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
        <Stack spacing={2} direction="row" justifyContent="center">
            <ButtonCustom variant="contained" onClick={() => { goToPage("/cadastrar") }} >Cadastrar</ButtonCustom>
            <ButtonCustom variant="contained" onClick={() => { rowSelected ? goToPage("/atualizar") : setOpenWarning(true) }} >Editar</ButtonCustom>
            <ButtonCustom variant="contained" onClick={() => { deletePatient() }} >Deletar</ButtonCustom>
        </Stack>
    </Grid>
);
}
