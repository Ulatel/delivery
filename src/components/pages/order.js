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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

import "../../less/pages/main.less";

import _ from '../../../config';

export default function({ }){
    const { id } = useParams();
    const [ children, setChildren ] = useState([]);
    const [ orderTime, setOrderTime ] = useState("");
    const [ deliveryTime, setDeliverTime ] = useState("");
    const [ price1, setPrice ] = useState(0);
    const [ status, setStatus ] = useState("");
    const [ update, setUpdate ] = useState("");
    const [ isNull, setNull ] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const nav = useNavigate();


    useEffect(() => {
        //setLoading(true);
        
        (async () => {
            let json;
            try{
            json = await fetchData((new URL(`/api/order/`+id, _.api_server)), {}, 'GET');
            }
            catch(e){
                enqueueSnackbar(e.message, {variant:'error'})
                return false;
            }
            if (!json) {
                setNull(true);
                enqueueSnackbar( 'No dishes', { variant: 'warning' });
                
                return false;
            }
            setDeliverTime(json.deliveryTime);
            setOrderTime(json.orderTime);
            setPrice(json.priсe);
            setStatus(json.status);
            //setLoading(false);
            console.log(price1);
            //console.log(1);
            let a=0;
            
            setChildren(json.dishes.map((card) => {
                a+=parseInt(card.totalPrice);
                return <Order
                        key={card.id}
                        id={card.id}
                        name={card.name}
                        totalPrice={card.totalPrice}
                        price={card.price}
                        amount={card.amount}
                        image={card.image}
                    />;
            }));
            setPrice(a);
            //setUpdate("")
        })();
    }, [id, update]);

    return <>
        <Box sx={(theme) => theme.palette.pages.main.Main.bg}>
            <Header/>
            <Card sx={{ maxWidth: 900, position: "relative", flexWrap: "wrap",  flexFlow: "row wrap", alignItems: "stretch"}}>
      
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Заказ  {}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Дата заказа: {((orderTime).slice(0, 10).replaceAll('-','.'))} </Typography>
        <Typography variant="body2" color="text.secondary"> Дата доставки: {((deliveryTime).slice(0, 10).replaceAll('-','.'))}</Typography>
        <Typography   variant="body2" color="text.secondary">Статус заказа - {(status=="Delivered")&&"Доставлено"||status!="Delivered"&&"В пути"}</Typography>
        
        
      </CardContent>
      <CardContent>
      { status=="InProcess" && 
      <Button sx={{marginRight: 5, color:"red"}} onClick={()=>{
                            try{
                                fetchData((new URL(`/api/order/${id.toString()}/status`, _.api_server)), {}, 'POST');
                                }
                                catch(e){
                                    enqueueSnackbar(e.message, {variant:'error'})
                                    return false;
                                }  
                                setUpdate("1");
                        }}>Подтвердить заказ</Button>}
      <Typography fontWeight="bold" variant="body2" color="text.secondary" margin="right">
          Цена:  {price1}
        </Typography>
      </CardContent>

      <List sx={{width: '100%', maxWidth: 900, margin: "auto"}} >
                
                { children }
                
            </List>
      
    </Card>
        </Box>
    </>;
}