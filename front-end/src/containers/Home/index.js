import React, { useEffect, useState } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import ButtonCustom from '../../styles/button';


const baseUrl = 'https://ivcg8on2bb.execute-api.us-east-1.amazonaws.com/default'


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

    const deletePatient = async () => {
        try {
            // setLoading(true)
            console.log("Paciente selecionado")
            console.log(rowSelected)
            await axios.post(
                `https://thingproxy.freeboard.io/fetch/https://eii3sexcr3.execute-api.us-east-1.amazonaws.com/default/remove_patient`,
                {id: rowSelected.id}
            )
            
            console.log("Deletado!")
            getAllPatients()
            // setOpen(true)

        } catch (error) {
            console.log("Erro ao deletar")
            console.log(error)
            console.log(error.data)
            console.log(error.status)
            console.log(error.statusText)
        }
    }

    function getAllPatients() {
        axios.get(`${baseUrl}/get_all_patients`)
            .then((response) => { setListPatients(response.data.results) })
    }

    useEffect(() => {
        getAllPatients()
    }, [])

    console.log(listPatients)

    const goToPage = (page) => {
        window.localStorage.setItem("patient", JSON.stringify(rowSelected))
        history.push(`${page}`);
    }

    

    return (
        <div>
            Página inicial

            {
                listPatients ?
                    <div>
                        <DataGrid
                            rows={listPatients}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            autoHeight
                            autoPageSize
                            disableMultipleSelection={true}
                            isRowSelectable={(params) => {setRowSelected(params.row);console.log(params.row)}}
                        // cellCheckbox
                        // checkboxSelection
                        />
                    </div>
                    :
                    <div>Loading...</div>
            }
            <Stack spacing={2} direction="row">
                <ButtonCustom variant="contained" onClick={() => { goToPage("/cadastrar") }} >Cadastrar</ButtonCustom>
                <ButtonCustom variant="contained" onClick={() => { rowSelected && goToPage("/atualizar") }} >Editar</ButtonCustom>
                <ButtonCustom variant="contained" onClick={()=>{ deletePatient()}} >Deletar</ButtonCustom>
            </Stack>
        </div>
    );
}
