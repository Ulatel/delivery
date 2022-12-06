import React, { useMemo } from "react";
import Header from '../Header';
import fetchData from "../../utils/fetchData";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ModeNight from "@mui/icons-material/ModeNight";
import Brightness4 from '@mui/icons-material/Brightness4';
import { useSnackbar } from "notistack";
import { grey } from "@mui/material/colors";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, IconButton, Typography } from '@mui/material';

import _ from '../../../config'//импорт файтлика для запросов. 

export default function(){
    const { enqueueSnackbar } = useSnackbar();
    const nav = useNavigate();
    
    const nick = useMemo(() => {
       return window.SuperGlobal.syncProfile[0]?.nickName
    }, [window.SuperGlobal.syncProfile[0]]);
    
    const location = useLocation();
    
    return <>
        <Header
            title={<Button component={Link} variant='outline' to='/' sx={() => {
                return {
                    fontSize: '1.25em',
                    display: { xs: 'none', md: 'unset' },

                };
            }}>Eat Catalog</Button>}
            logined={window.SuperGlobal.auth[0] && <Typography>Авторизован как — {nick}</Typography>}
            loginButton={window.SuperGlobal.auth[0] ?
                <IconButton variant='outline' edge='end' onClick={() => {
                    fetchData(new URL(`/api/account/logout`, _.api_server)).then(() => {
                        enqueueSnackbar('Logouted', { variant: 'success' });
                        localStorage.removeItem('movieToken');
                        window.SuperGlobal.auth[1](false);
                        nav('/');
                    })
                }}><LogoutIcon /></IconButton> :
                <IconButton component={Link} variant='outline' to='/login' edge='end'><LoginIcon /></IconButton>
            }
            themeButton={
                <IconButton onClick={(e) => {
                    e.preventDefault();
                    
                    window.SuperGlobal.darkMode[1](() => {
                        localStorage.setItem('theme', !window.SuperGlobal.darkMode[0]);
                        
                        return !window.SuperGlobal.darkMode[0];
                    });
                }}>
                    {window.SuperGlobal.darkMode[0] ? <Brightness4 /> : <ModeNight />}
                </IconButton>
            }
        >
        
            { <>
            {window.SuperGlobal.auth[0] &&
            <>
                <Button key={'favorites'} component={Link} variant='outline' to='/favorites' sx={() => {
                    return { backgroundColor: location.pathname == '/favorites' ? grey[800] : '' };
                }}>Избраное</Button>
                <Button key={'profile'} component={Link} variant='outline' to='/profile' sx={() => {
                    return {backgroundColor: location.pathname == '/profile' ? grey[800] : '' };
                }}>Мой профиль</Button>
            </>
            }
            </>}

        </Header>
    </>;
}