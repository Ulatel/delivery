import React from "react";
import Center from '../Center'
import Header from '../app/Header';
import Registration from "../app/Registration";
import ThemeInvetor from "../app/ThemeInvetor";
import { Box } from '@mui/material';

export default function ({ }) {
    return <>
        <Box sx={(theme) => theme.palette.pages.main.Main.bg}>
            <Header />
            <ThemeInvetor>
                <Box padding={2}>
                    <Center>
                        <Registration />
                    </Center>
                </Box>
            </ThemeInvetor>
        </Box>
    </>;
}