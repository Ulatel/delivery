import React from "react";
import Header from '../app/Header';
import { Box } from '@mui/material';
import { useParams } from "react-router-dom";

import "../../less/pages/main.less";

export default function({ }){
    const { id } = useParams();
    
    return <>
        <Box sx={(theme) => theme.palette.pages.main.Main.bg}>
            <Header/>
            <Box padding={2}>
                {/* <Movie page={parseInt(id ?? 1)} /> */}
            </Box>
        </Box>
    </>;
}