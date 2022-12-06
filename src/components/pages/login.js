import React from "react";
import Center from '../Center'
import Header from '../app/Header';
import Login from "../app/Login";
import ThemeInvetor from "../app/ThemeInvetor";
import { Box } from '@mui/material';

export default function ({ }) {
    return <>
        <Box sx={(theme) => theme.palette.pages.main.Main.bg}>
            <Header />
            <ThemeInvetor>
                <Box padding={2}>
                    <Center>
                        <Login />
                    </Center>
                </Box>
            </ThemeInvetor>
        </Box>
    </>;
}