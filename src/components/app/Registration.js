import React, { useState } from "react";
import fetchData from "../../utils/fetchData";
import errorParser from "../../utils/errorParser";
import { useSnackbar } from "notistack";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Paper, Select, MenuItem, Typography } from "@mui/material";

import _ from '../../../config';

export default function({ }){
    
    const [FIO, setFIO] = useState('');
    const [Male, setMale] = useState('');
    const [Adress, setAdress] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [BirthDate, setBirthDate] = useState('');
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    
    const nav = useNavigate();
    
    const { enqueueSnackbar } = useSnackbar();//вывод уведомлений
    
    return <>
        <Paper elevation={2} sx={{ padding: 2 }}>
            <form>
                
                <Typography sx={(theme) => theme.palette.pages.main.H3}>Регистрация</Typography>
                
                <Input required placeholder='ФИО' type='text' value={FIO} onChange={(e) => setFIO(e.target.value)} fullWidth />
                <Box sx={{ height: '0.5em' }} />
                <Typography >Пол</Typography>
                <Select sx={{ height: '3em' }} required value={Male} onChange={(e) => {setMale(e.target.value);alert(e.target.value)}} fullWidth  >
                            <MenuItem value={"Male"}>Мужской</MenuItem>
                            <MenuItem value={"Female"}>Женский</MenuItem>
                        </Select>
                
                <Typography >Телефон</Typography>
                <Input required placeholder='+7(ххх) ххх-хх-хх' type='number' value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} fullWidth />
                <Box sx={{ height: '0.5em' }} />
                <Typography >День рождения</Typography>
                <Input  type='date' value={BirthDate}  min="1900-01-01" max="2022-12-12" onChange={(e) => setBirthDate(e.target.value) } fullWidth />
                <Box sx={{ height: '0.5em' }}/>
                <Input required placeholder='Адресс' type='text' value={Adress} onChange={(e) => setAdress(e.target.value)} fullWidth />
                <Box sx={{ height: '0.5em' }} />
                <Input required placeholder='Почта' type='email' value={login} onChange={(e) => setLogin(e.target.value)} fullWidth />
                <Box sx={{ height: '0.5em' }} />
                <Input required placeholder='Пароль' type='password' value={pass} onChange={(e) => setPass(e.target.value)} fullWidth />
                    
                
                <Box sx={{ height: '1.5em' }} />
                <Button variant='contained' type='submit' sx={{ marginRight: '0.25em' }} onClick={(e) => {
                    e.preventDefault();
                    
                    fetchData(new URL(`/api/account/register`, _.api_server), {
                        fullName: FIO,
                        password: pass,
                        email: login,
                        address: Adress,
                        birthDate: BirthDate,
                        gender: Male,
                        phoneNumber: PhoneNumber
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
                }}>Зарегистрироваться</Button>
            </form>
        </Paper>
    </>;
}