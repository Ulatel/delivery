import React, {useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";
import errorParser from "../../utils/errorParser";
import { useSnackbar } from "notistack";
import { Box } from "@mui/system";
import { json, Link, useNavigate } from "react-router-dom";
import MaskedInput from 'react-text-mask'
import { Button, Input, Paper, Select, MenuItem, Typography } from "@mui/material";
import InputMask from 'react-input-mask';
function PhoneInput(props) {
  return (
    <InputMask 
      mask='+7(999) 999 9999' 
      value={props.value} 
      onChange={props.onChange}>
    </InputMask>
  );
  }
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
    const [phone, setPhone] = useState('');
  const handleInput = ({ target: { value } }) => setPhone(value);
 
    
    const { enqueueSnackbar } = useSnackbar();//вывод уведомлений
    
    useEffect(() => {
        //setLoading(true);
        
        (async () => {
            let json;
            try{
            json = await fetchData((new URL('/api/account/profile', _.api_server)), {}, 'GET');
            }
            catch(e){
                enqueueSnackbar(e.message, {variant:'error'})
                return false;
            }
            console.log(phone);
            setAdress(json.address);
            setBirthDate(json.birthDate);
            setFIO(json.fullName);
            setMale(json.gender);
            setPhone(json.phoneNumber);
        })();
    }, []);

    return <>
        <Paper elevation={2} sx={{ padding: 2 }}>
            <form>
                
                <Typography sx={(theme) => theme.palette.pages.main.H3}>Профиль</Typography>
                
                <Input required placeholder='ФИО' type='text' value={FIO} onChange={(e) => setFIO(e.target.value)} fullWidth />
                <Box sx={{ height: '0.5em' }} />
                <Typography >Пол:  {Male}</Typography>
                

                <Typography >Телефон</Typography>
                <PhoneInput 
        value={phone} 
        onChange={handleInput}>
      </PhoneInput>
                <Box sx={{ height: '0.5em' }} />
                <Typography >День рождения</Typography>
                <Input  type='date' defaultValue={BirthDate}  min="1900-01-01" max="2022-12-12" onChange={(e) => setBirthDate(e.target.value) } fullWidth />
                <Box sx={{ height: '0.5em' }}/>
                <Input required placeholder='Адресс' type='text' value={Adress} onChange={(e) => setAdress(e.target.value)} fullWidth />
                <Box sx={{ height: '0.5em' }} />
                <Input disabled placeholder='Почта' type='email' value={login} onChange={(e) => setLogin(e.target.value)} fullWidth />
                    
                
                <Box sx={{ height: '1.5em' }} />
                <Button variant='contained' type='submit' sx={{ marginRight: '0.25em' }} onClick={(e) => {
                    e.preventDefault();
                    
                    let date = Date.parse(BirthDate);

                    if(new Date() <= new Date(date)){
                        enqueueSnackbar(`Одумойтесь, вы еще не родились!!`, { variant: 'error' });
                        return 0;
                    }
                    
                    var regex;var matches ;
                    regex = /_/;
                    matches=phone.match(regex);
                    if(matches){
                        enqueueSnackbar(`Введите телефон полностью`, { variant: 'error' });
                        return 0;
                    }
                    


                    if(!FIO || !Adress || !BirthDate || !Male || !phone){
                        enqueueSnackbar(`Все поля должны быть заполнены!!`, { variant: 'error' });
                        return 0;
                    }
                    fetchData(new URL(`/api/account/profile`, _.api_server), {
                        fullName: FIO,
                        address: Adress,
                        birthDate: BirthDate.toString(),
                        gender: Male,
                        phoneNumber: phone.toString()
                    }, 'PUT').then((data) => {
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
                        enqueueSnackbar(`Аккаунт обновлен!`, { variant: 'success' });
                        return true;
                    }).catch((err) => {
                        enqueueSnackbar(err.message, { variant: 'error' });
                    });
                }}>Обновить</Button>
            </form>
        </Paper>
    </>;
}