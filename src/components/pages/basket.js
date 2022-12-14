import React, {useEffect, useState } from "react";
import Header from '../app/Header';
import Basket from '../app/Basket';
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
    const [ update, setUpdate] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const nav = useNavigate();


    useEffect(() => {
        //setLoading(true);
        
        (async () => {
            let json;
            setUpdate("");
            try{
            json = await fetchData((new URL(`/api/basket`, _.api_server)), {}, 'GET');
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

                return <Basket
                        key={card.id}
                        id={card.id}
                        name={card.name}
                        price={card.price}
                        image={card.image}
                        amount={card.amount}

                        onClick={() => {
                            nav(`/dish/${card.id}`);
                        }}

                        inBasket={(id)=>{
                            fetchData(new URL(`/api/basket/dish/${id}`, _.api_server), {dishId : id}, 'POST').then((data) => {
                                const errors = errorParser(data);
                                
                                if (errors.length){
                                    enqueueSnackbar(errors.join(', '), { variant: 'error' });
                                    return false;
                                }
                                
                                enqueueSnackbar(`${'added to' } basket`, { variant: 'success' });
                                setUpdate("1");
                                return true;
                            }).catch((e) => {
                                enqueueSnackbar(e.message, { variant: 'error' });
                            });
                            console.log("в корзину")
                          }}

                          outBasket= {(id, ins)=>{
                            fetchData(new URL(`/api/basket/dish/${id}`, _.api_server), {dishId : id, inscare: ins}, 'DELETE').then((data) => {
                                const errors = errorParser(data);
                                
                                if (errors.length){
                                    enqueueSnackbar(errors.join(', '), { variant: 'error' });
                                    return false;
                                }
                                
                                enqueueSnackbar(`${'added to' } basket`, { variant: 'success' });
                                
                                return true;
                            }).catch((e) => {
                                enqueueSnackbar(e.message, { variant: 'error' });
                            });
                            setUpdate("1");
                            console.log("из корзины")
                          }}
                    />;
            }));
        })();
    }, [update]);

    return <>
        <Box sx={(theme) => theme.palette.pages.main.Main.bg}>
            <Header/>
            <List sx={{ width: '100%', maxWidth: 900, margin: "auto"}} >
                
                { children.length==0 && <Typography gutterBottom variant="h5" component="div" color="white" sx={{display: "flex", justifyContent: "center"}}>Корзина пуста</Typography>}
                { children.length!=0 && <Typography gutterBottom variant="h5" component="div" color="white" sx={{display: "flex", justifyContent: "center"}}>Товары в корзине</Typography>}
                { children }
                
            </List>
        </Box>
    </>;
}