import React from "react";
import Hamburger from "./Hamburger";
import reactWrap from '../utils/react_children_wrap';
import { AppBar, Toolbar, Box, Grid } from '@mui/material';

export default function({ title, children, logined, loginButton, themeButton }){//заголовок, нужные кнопки
    return <>
        <AppBar position='sticky' sx={(theme) => theme.palette.pages.main.Header.bg}>
            <Toolbar>
                <Hamburger title={title}>{children}</Hamburger>
                {title}
                {/* <Box sx={{ flexGrow: 1 }} /> */}

                <Grid container spacing={4} marginLeft={3} marginBottom={-0.5} sx={{ width: 'auto', display: { xs: 'none', md: 'flex' } }}>
                    {reactWrap(children, (e, i) => { return <Grid item key={i} sx={(theme) =>  theme.palette.pages.main.Header.buttons}>{e}</Grid>; })}
                </Grid>
                
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {logined && React.cloneElement(logined, { marginRight: 4 })}
                    {themeButton}
                    {loginButton}
                </Box>
            </Toolbar>
        </AppBar>
    </>;
}