import React, { useState } from "react";
import fetchData from "../../utils/fetchData";
import errorParser from "../../utils/errorParser";
import { useSnackbar } from "notistack";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Paper, Typography } from "@mui/material";

import _ from '../../../config';

export default function({ }){
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    
    const nav = useNavigate();
    
    const { enqueueSnackbar } = useSnackbar();//вывод уведомлений
    
    return <>
        <Paper elevation={2} sx={{ padding: 2 }}>
            <form>
                
                <Typography sx={(theme) => theme.palette.pages.main.H3}>Авторизация</Typography>
                <Input required placeholder='Login' type='text' value={login} onChange={(e) => setLogin(e.target.value)} fullWidth />
                <Box sx={{ height: '0.5em' }} />
                <Input required placeholder='Password' type='password' value={pass} onChange={(e) => setPass(e.target.value)} fullWidth />
                
                <Box sx={{ height: '1.5em' }} />
                <Button variant='contained' type='submit' sx={{ marginRight: '0.25em' }} onClick={(e) => {
                    e.preventDefault();
                    
                    var regex;var matches ;
                    regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    matches=login.match(regex);
                    if(!matches){
                        enqueueSnackbar(`Введите корректную почту`, { variant: 'error' });
                        return 0;
                    }
                    regex = /\d+/g;
                    matches = pass.match(regex);

                    

                    if(pass.length<6){
                        enqueueSnackbar(`Пароль должен быть больше 6 символов`, { variant: 'error' });
                        return 0;
                    }

                    if( !pass || !login ){
                        enqueueSnackbar(`Все поля должны быть заполнены!!`, { variant: 'error' });
                        return 0;
                    }
                    fetchData(new URL(`/api/account/login`, _.api_server), {
                        email: login,
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
                            localStorage.setItem('dishToken', data.token);
                            window.SuperGlobal.auth[1](true);
                            nav('/');
                        }
                        
                        return true;
                    }).catch((err) => {
                        enqueueSnackbar(err.message, { variant: 'error' });
                    });
                    window.SuperGlobal.email = login;
                }}>Войти</Button>
            </form>
        </Paper>
    </>;
}