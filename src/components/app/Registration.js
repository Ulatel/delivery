import React, { useState } from "react";
import fetchData from "../../utils/fetchData";
import errorParser from "../../utils/errorParser";
import { useSnackbar } from "notistack";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import MaskedInput from 'react-text-mask'
import { Button, Input, Paper, Select, MenuItem, Typography } from "@mui/material";
import InputMask from 'react-input-mask';
import _ from '../../../config';
function PhoneInput(props) {
    return (
      <InputMask 
        mask='+7(999) 999 9999' 
        value={props.value} 
        onChange={props.onChange}>
      </InputMask>
    );
    }
export default function({ }){
    
    const [FIO, setFIO] = useState('');
    const [Male, setMale] = useState('');
    const [Adress, setAdress] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [BirthDate, setBirthDate] = useState('');
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const [phone, setPhone] = useState('');
  const handleInput = ({ target: { value } }) => setPhone(value);
    
    const nav = useNavigate();
    
    const { enqueueSnackbar } = useSnackbar();//вывод уведомлений
    
    return <>
        <Paper elevation={2} sx={{ padding: 2 }}>
            <form>
                
                <Typography sx={(theme) => theme.palette.pages.main.H3}>Регистрация</Typography>
                
                <Input required placeholder='ФИО' type='text' value={FIO} onChange={(e) => setFIO(e.target.value)} fullWidth />
                <Box sx={{ height: '0.5em' }} />
                <Typography >Пол</Typography>
                <Select sx={{ height: '3em' }} required value={Male} onChange={(e) => {setMale(e.target.value)}} fullWidth  >
                            <MenuItem value={"Male"}>Мужской</MenuItem>
                            <MenuItem value={"Female"}>Женский</MenuItem>
                        </Select>
                        
                <Typography >Телефон</Typography>
                
                <PhoneInput 
        value={phone} 
        onChange={handleInput}>
      </PhoneInput>
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
                    
                    let date = Date.parse(BirthDate);

                    if(new Date() <= new Date(date)){
                        enqueueSnackbar(`Одумойтесь, вы еще не родились!!`, { variant: 'error' });
                        return 0;
                    }
                    var regex;var matches ;
                    regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    matches=login.match(regex);
                    if(!matches){
                        enqueueSnackbar(`Введите корректную почту`, { variant: 'error' });
                        return 0;
                    }
                    regex = /\d+/g;
                    matches = pass.match(regex);

                    if(!matches){
                        enqueueSnackbar(`Пароль должен содержать цифры`, { variant: 'error' });
                        return 0;
                    }

                    if(pass.length<6){
                        enqueueSnackbar(`Пароль должен быть больше 6 символов`, { variant: 'error' });
                        return 0;
                    }
                    var regex;var matches ;
                    regex = /_/;
                    matches=phone.match(regex);
                    if(matches){
                        enqueueSnackbar(`Введите телефон полностью`, { variant: 'error' });
                        return 0;
                    }
                    
                    

                    if(!FIO || !pass || !login ||!Adress || !BirthDate || !Male || !phone){
                        enqueueSnackbar(`Все поля должны быть заполнены!!`, { variant: 'error' });
                        return 0;
                    }
                    fetchData(new URL(`/api/account/register`, _.api_server), {
                        fullName: FIO,
                        password: pass,
                        email: login,
                        address: Adress,
                        birthDate: BirthDate.toString(),
                        gender: Male,
                        phoneNumber: phone
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
                }}>Зарегистрироваться</Button>
            </form>
        </Paper>
    </>;
}