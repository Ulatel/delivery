import React, { useState } from "react";
import fetchData from "../../utils/fetchData";
import errorParser from "../../utils/errorParser";
import { useSnackbar } from "notistack";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Paper } from "@mui/material";

import _ from '../../../config';

export default function({ }){
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    
    const nav = useNavigate();
    
    const { enqueueSnackbar } = useSnackbar();//вывод уведомлений
    
    return <>
        <Paper elevation={2} sx={{ padding: 2 }}>
            <form>
                <Input required placeholder='Login' type='text' value={login} onChange={(e) => setLogin(e.target.value)} fullWidth />
                <Box sx={{ height: '0.5em' }} />
                <Input required placeholder='Password' type='password' value={pass} onChange={(e) => setPass(e.target.value)} fullWidth />
                
                <Box sx={{ height: '1.5em' }} />
                
                <Button variant='contained' type='submit' sx={{ marginRight: '0.25em' }} onClick={(e) => {
                    e.preventDefault();
                    
                    fetchData(new URL(`/api/account/login`, _.api_server), {
                        username: login,
                        password: pass,
                    }).then((data) => {
                        //обработчик ошибок запросов 
                        const errors = errorParser(data);
                        
                        if (errors.length){
                            enqueueSnackbar(errors.join(', '), { variant: 'error' });
                            return false;
                        }
                        //пришел ли токен
                        if (data.token){
                            localStorage.setItem('movieToken', data.token);
                            window.SuperGlobal.auth[1](true);
                            nav('/');
                        }
                        
                        return true;
                    }).catch((err) => {
                        enqueueSnackbar(err.message, { variant: 'error' });
                    });
                }}>Войти</Button>
                <Button component={Link} to='/registration' variant='contained' color='secondary'>Зарегистрироваться</Button>
            </form>
        </Paper>
    </>;
}