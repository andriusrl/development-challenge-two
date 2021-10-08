import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';

import { useHistory } from "react-router-dom";

export default function Header(props) {
    const history = useHistory();
    const auth = JSON.parse(window.localStorage.getItem('auth'))
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        auth && setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const goToPage = (page) => {
        history.push(`${page}`);
    }
    const logoff = () => {
        window.localStorage.setItem("auth", null)
        goToPage("/login")
    }
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleClick} >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <Stack spacing={1} direction="column" >
                        <MenuItem onClick={()=>{goToPage("/")}}>Lista de pacientes</MenuItem>
                        <MenuItem onClick={logoff}>Deslogar</MenuItem>
                    </Stack>
                </Menu>
                <Typography variant="h6" color="inherit" component="div">
                    {auth && `${auth.name} - `}
                    {props.pageTitle && props.pageTitle}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}