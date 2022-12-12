import React, {useEffect, useState } from "react";
import Header from '../app/Header';
import Order from '../app/Order';
import PaginationRounded from '../Pagination';
import FilterSelect from '../Sort';
import LimitTags from '../Filter';
import { Box } from '@mui/material';
import { useParams } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import errorParser from "../../utils/errorParser";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';

import Typography from '@mui/material/Typography';

import "../../less/pages/main.less";

import _ from '../../../config';

export default function({ }){
    const { id } = useParams();
    const [ children, setChildren ] = useState([]);
    const [ isNull, setNull ] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const nav = useNavigate();


    useEffect(() => {
        //setLoading(true);
        
        (async () => {
            let json;
            try{
            json = await fetchData((new URL(`/api/order`, _.api_server)), {}, 'GET');
            }
            catch(e){
                enqueueSnackbar(e.message, {variant:'error'})
                return false;
            }
            //setLoading(false);
            console.log(json);
            
            if (!json) {
                setNull(true);
                enqueueSnackbar( 'No dishes', { variant: 'warning' });
                
                return false;
            }
            
            setChildren(json.map((card) => {

                return <Order
                        key={card.id}
                        id={card.id}
                        deliveryTime={card.deliveryTime}
                        orderTime={card.orderTime}
                        price={card.price}
                        status={card.status}

                        onClick={() => {
                            nav(`/order/${card.id}`);
                        }}
                    />;
            }));
        })();
    }, []);

    return <>
        <Box sx={(theme) => theme.palette.pages.main.Main.bg}>
            <Header/>
            <List sx={{ width: '100%', maxWidth: 900, margin: "auto"}} >
                
                { children.length==0 && <Typography gutterBottom variant="h5" component="div" color="white" sx={{display: "flex", justifyContent: "center"}}>Список заказов пуст</Typography>}
                { children.length!=0 && <Typography gutterBottom variant="h5" component="div" color="white" sx={{display: "flex", justifyContent: "center"}}>Последние заказы</Typography>}
                { children }
                
            </List>
        </Box>
    </>;
}