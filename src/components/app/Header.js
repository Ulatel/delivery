import React, { useMemo } from "react";
import Header from '../Header';
import fetchData from "../../utils/fetchData";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ModeNight from "@mui/icons-material/ModeNight";
import Brightness4 from '@mui/icons-material/Brightness4';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useSnackbar } from "notistack";
import { grey } from "@mui/material/colors";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, IconButton, Typography } from '@mui/material';

import _ from '../../../config'//импорт файтлика для запросов. 

export default function(){
    const { enqueueSnackbar } = useSnackbar();
    const nav = useNavigate();
    
    const nick = useMemo(() => {
       return window.SuperGlobal.email
    }, [window.SuperGlobal.syncProfile[0]]);
    
    const location = useLocation();
    
    return <>
        <Header
            title={<Button component={Link} variant='outline' to='/' sx={() => {
                return {
                    fontSize: '1.25em',
                    display: { xs: 'none', md: 'unset' },

                };
            }}>Delivery.Кушац</Button>}
            profile={window.SuperGlobal.auth[0] && 
            <Button key={'profile'} component={Link} variant='outline' to='/profile' sx={() => {
                return { backgroundColor: location.pathname == '/profile' ? grey[800] : '' };
            }}>{nick}</Button>}
            loginButton={window.SuperGlobal.auth[0] ?
                <IconButton variant='outline' edge='end' onClick={() => {
                    fetchData(new URL(`/api/account/logout`, _.api_server)).then(() => {
                        enqueueSnackbar('Logouted', { variant: 'success' });
                        localStorage.removeItem('movieToken');
                        window.SuperGlobal.auth[1](false);
                        nav('/');
                    })
                }}><LogoutIcon /></IconButton> :
                <>
                    <IconButton key={'registration'} component={Link} variant='outline' to='/registration' sx={() => {
                        return { backgroundColor: location.pathname == '/registration' ? grey[800] : '' };
                    }}><PersonAddAltIcon/></IconButton>
                    <IconButton component={Link} variant='outline' to='/login' edge='end'><LoginIcon /></IconButton>
                </>
                }
            /*themeButton={
                <IconButton onClick={(e) => {
                    e.preventDefault();
                    
                    window.SuperGlobal.darkMode[1](() => {
                        localStorage.setItem('theme', !window.SuperGlobal.darkMode[0]);
                        
                        return !window.SuperGlobal.darkMode[0];
                    });
                }}>
                    {window.SuperGlobal.darkMode[0] ? <Brightness4 /> : <ModeNight />}
                </IconButton>
            }*/
        >
        
            { <>
                <Button key={'menu'} component={Link} variant='outline' to='/' sx={() => {
                    return { backgroundColor: location.pathname == '/' ? grey[800] : '' };
                }}>Меню</Button>
            {window.SuperGlobal.auth[0] &&
            <>
                
                <Button key={'orders'} component={Link} variant='outline' to='/orders' sx={() => {
                    return { backgroundColor: location.pathname == '/orders' ? grey[800] : '' };
                }}>Заказы</Button>
                <Button key={'basket'} component={Link} variant='outline' to='/basket' sx={() => {
                    return {backgroundColor: location.pathname == '/basket' ? grey[800] : '' };
                }}>Корзина</Button>
            </>
            }
            </>}

        </Header>
    </>;
}