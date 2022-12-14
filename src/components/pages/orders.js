import React, {useEffect, useState } from "react";
import Header from '../app/Header';
import Orders from '../app/Orders';
import Card from '@mui/material/Card';
import PaginationRounded from '../Pagination';
import FilterSelect from '../Sort';
import LimitTags from '../Filter';
import { Box, Button } from '@mui/material';
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
    
    const [ fullBasket, setFull ] = useState("");
    const [ update, setUpdate ] = useState(0);
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
            //console.log(json);
            setUpdate(0);
            if (!json) {
                setNull(true);
                enqueueSnackbar( 'No dishes', { variant: 'warning' });
                
                return false;
            }
            let json2;
            try{
                json2 = await fetchData((new URL(`/api/basket`, _.api_server)), {}, 'GET');
                }
            catch(e){
                enqueueSnackbar(e.message, {variant:'error'})
                return false;
            }
            setFull("");
            if(json2.length>0) setFull("1");
            
            setChildren(json.map((card) => {

                return <Orders
                        key={card.id}
                        id={card.id}
                        deliveryTime={card.deliveryTime}
                        orderTime={card.orderTime}
                        price={card.price}
                        status={card.status}

                        onClick={() => {
                            nav(`/order/${card.id}`);
                        }}

                        confirm={(id)=>{
                            try{
                                fetchData((new URL(`/api/order/${id.toString()}/status`, _.api_server)), {}, 'POST');
                                }
                                catch(e){
                                    enqueueSnackbar(e.message, {variant:'error'})
                                    return false;
                                }  
                                setUpdate(1);
                        }}
                    />;
            }));
        })();
    }, [update]);

    return <>
        <Box sx={(theme) => theme.palette.pages.main.Main.bg}>
            <Header/>{
                fullBasket &&
                <Card sx={{margin: "auto", display: "flex",justifyContent: "space-between", maxWidth: 900, position: "relative", flexWrap: "wrap",  flexFlow: "row wrap", alignItems: "stretch"}}>
                    <Typography marginLeft={2} marginTop={1} variant="body2" color="text.secondary">
                    В корзине есть блюда, которые можно оформить
                    </Typography>
                    <Button  onClick={()=>{nav(`/purchase`)}}>Оформить</Button>
                </Card>
            }

            <List sx={{ width: '100%', maxWidth: 900, margin: "auto"}} >
                
                { children.length==0 && <Typography gutterBottom variant="h5" component="div" color="white" sx={{display: "flex", justifyContent: "center"}}>Список заказов пуст</Typography>}
                { children.length!=0 && <Typography gutterBottom variant="h5" component="div" color="white" sx={{display: "flex", justifyContent: "center"}}>Последние заказы</Typography>}
                { children }
                
            </List>
        </Box>
    </>;
}