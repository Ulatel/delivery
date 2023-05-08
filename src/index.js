//для реакта, но не обязательно
import React, { useMemo, useState } from "react";
import $ from 'jquery';
import style from "./theme";
import fetchData from "./utils/fetchData";
import Main from './components/pages/Index';
import { createRoot } from 'react-dom/client';
import { useMediaQuery } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'

import _ from '../config'
import "./less/index.less";
import Dish from "./components/pages/dish";
import Order from "./components/pages/order";

const pages = (ctx => {
    let keys = ctx.keys();
    let values = keys.map(ctx);
    return keys.reduce((o, k, i) => { o[k] = values[i]; return o; }, {});
})(require.context('./components/pages', true, /.jsx?/));

window.SuperGlobal = window.SuperGlobal || {};//шлобальное состофяние, например для аутентификации, можно заменить редуксом

$(function(){//сразу после загрузки страницы из-за $
    $.fn.extend({//для анимации (ставит ксс анимацию в очередь)
        qcss: function(css) {
            return $(this).queue(function(next) {
                $(this).css(css);
                next();
            });
        }
    });

    function App({ }){//начало приложнеия
        window.SuperGlobal.darkMode = useState(localStorage.getItem('theme') ?? false);//состояние темы
        
        const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');//спрашивает у браузера
        const theme = React.useMemo(() => createTheme(style(window.SuperGlobal.darkMode[1] || prefersDarkMode)), [prefersDarkMode, window.SuperGlobal.darkMode[0]]);//устанавливает
        
        //window.SuperGlobal.auth =  useState(true);//аутентификация
        window.SuperGlobal.auth = useState(localStorage.getItem('dishToken') ? true : false);//аутентификация
        window.SuperGlobal.syncProfile = useState({});
        
        useMemo(() => {
            if (window.SuperGlobal.auth[0]){
                window.SuperGlobal.token = localStorage.getItem('dishToken');
                //window.SuperGlobal.profile = fetchData(new URL(`/api/account/profile`, _.api_server), {}, 'GET').catch(() => {
                    //enqueueSnackbar(e.message, { variant: 'error' });
                //});
                
                (async () => {
                    window.SuperGlobal.syncProfile[1](await window.SuperGlobal.profile);
                })();
            }
        }, [window.SuperGlobal.auth[0]]);//обьект
        
        let NotFound = useMemo(() => {
            return () => {
                return <>
                    <span>404 Not Found</span>
                </>;
            };
        }, []);
        
        let RouteApp = () => useRoutes([//какие страницы куда ведут
            { path: '/', element: <Main /> },
            { path: '/index.html', element: <Main /> },
            ...(Object.entries(pages).map((e) => {//определяются страницы
                let [key, El] = e;
                
                return {
                    path: key.match(/(\w+)\.jsx?/)[1].toLowerCase(),
                    element: <El.default />,
                };
            })),
            // { path: '/dish/:id', element: <Dish/> },//нужны доп аргументы, например id
            { path: '/?page=:page', element: <Main /> },
            { path: '/dish/:id', element: <Dish/> },
            { path: '/order/:id', element: <Order/> },
            { path: '*', element: <NotFound /> },
        ]);
        
        //console.log(theme);
        
        return (
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3}>{/*для уведомленний usesnackbar*/}
                    <Router>
                        <RouteApp />
                    </Router>
                </SnackbarProvider>
            </ThemeProvider>
        );
    }

    createRoot($('root')[0]).render(<App />);//создание приложения
});