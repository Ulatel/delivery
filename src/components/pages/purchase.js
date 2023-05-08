import React, {useEffect, useState } from "react";
import Header from '../app/Header';
import Purchase from '../app/Purchase';
import PaginationRounded from '../Pagination';
import FilterSelect from '../Sort';
import LimitTags from '../Filter';
import Card from '@mui/material/Card';
import { useParams } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import errorParser from "../../utils/errorParser";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import { Box, Button, Input, Paper, Typography } from "@mui/material";


import "../../less/pages/main.less";

import _ from '../../../config';

export default function({ }){
    const { id } = useParams();
    const [ children, setChildren ] = useState([]);
    const [ isNull, setNull ] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const nav = useNavigate();

    const [adres, setAdres] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    
    useEffect(() => {
        //setLoading(true);
        
        (async () => {
            let json;
            try{
            json = await fetchData((new URL(`/api/basket`, _.api_server)), {}, 'GET');
            }
            catch(e){
                enqueueSnackbar(e.message, {variant:'error'})
                return false;
            }
            //setLoading(false);
            //console.log(json);
            
            if (!json) {
                setNull(true);
                enqueueSnackbar( 'No dishes', { variant: 'warning' });
                
                return false;
            }
            
            setChildren(json.map((card) => {

                return <Purchase
                        key={card.id}
                        id={card.id}
                        name={card.name}
                        price={card.price}
                        image={card.image}
                        amount={card.amount}
                    />;
            }));
        })();
    }, []);

    return <>
        <Box sx={(theme) => theme.palette.pages.main.Main.bg}>
            <Header/>
            <Card sx={{margin: "auto", display: "flex", maxWidth: 900, position: "relative", flexWrap: "nowrap",  flexFlow: "row wrap", alignItems: "stretch"}}>
                { children.length==0 && <Typography gutterBottom variant="h5" component="div" color="white" sx={{display: "flex", justifyContent: "center"}}>Корзина пуста</Typography>}
                { children.length!=0 && <Typography gutterBottom variant="h5" component="div" color="white" sx={{display: "flex", justifyContent: "center"}}>Оформление заказа</Typography>}
                
                <Typography marginLeft={2} marginTop={1} variant="body2" color="text.secondary">
                Данные покупателя
                </Typography>
                
                <Input required placeholder='Адрес' type='text' value={adres} onChange={(e) => setAdres(e.target.value)} fullWidth />
                <Box sx={{ height: '0.5em' }} />
                <Input required placeholder='Время доставки' type='datetime-local' value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} fullWidth />
                
                <Box sx={{ height: '1.5em' }} />
            </Card>
            <List sx={{ grid: '1', width: '100%', display: "flex", alignContent: "space-around", flexDirection: "column", maxWidth: 900, margin: "auto"}} >
                
                { children }
                <Button  onClick={()=>{
                    try{
                        fetchData((new URL(`/api/order`, _.api_server)), {
                            deliveryTime: deliveryTime,
                            address: adres
                        }, 'POST');
                        }
                        catch(e){
                            enqueueSnackbar(e.message, {variant:'error'})
                            return false;
                        }  
                        nav(`/orders`);
                }}>Оформить</Button>
            </List>
        </Box>
    </>;
}