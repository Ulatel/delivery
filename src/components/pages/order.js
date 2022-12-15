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
    const [ price, setPrice ] = useState("");
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
            setUpdate("")
            setDeliverTime(json.deliveryTime);
            setOrderTime(json.orderTime);
            setPrice(json.priсe);
            setStatus(json.status);
            //setLoading(false);
            console.log(json);
            console.log(1);
            if (!json) {
                setNull(true);
                enqueueSnackbar( 'No dishes', { variant: 'warning' });
                
                return false;
            }
            
            setChildren(json.dishes.map((card) => {

                return <Order
                        key={card.id}
                        id={card.id}
                        name={card.name}
                        totalPrice={card.totalPrice}
                        price={card.totalPrice}
                        amount={card.amount}
                        image={card.image}
                    />;
            }));
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
        <Typography variant="body2" color="text.secondary">Статус заказа - {status}</Typography>
        
        
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
      <Typography variant="body2" color="text.secondary" margin="right">
          Цена:  {price}
        </Typography>
      </CardContent>

      <List sx={{ width: '100%', maxWidth: 900, margin: "auto", maxWidth: 900,  alignItems: "stretch", display: "flex", flexWrap: "no-wrap", justifyContent: "space-between",  flexFlow: "row wrap"}} >
                
                { children }
                
            </List>
      
    </Card>
        </Box>
    </>;
}