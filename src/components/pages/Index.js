import React, {useEffect, useState } from "react";
import Header from '../app/Header';
import Card from '../app/Card';
import Pagination from '../app/Pagination';
import { Box } from '@mui/material';
import { useParams } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import errorParser from "../../utils/errorParser";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";


import "../../less/pages/main.less";

import _ from '../../../config'

export default function({ }){
    const { id } = useParams();
    const [ currPage, setCurrPage ] = useState(id ?? 1);
    const [ pageCount, setPageCount ] = useState(1);
    const [ children, setChildren ] = useState([]);
    const [ isNull, setNull ] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const nav = useNavigate();


    useEffect(() => {
        //setLoading(true);
        
        (async () => {
            let json;
            try{
            json = await fetchData((new URL(`/api/dish`, _.api_server)), {}, 'GET');
            }
            catch(e){
                enqueueSnackbar(e.message, {variant:'error'})
                return false;
            }
            //setLoading(false);
            setPageCount(json?.pagination?.size);
            
            if (!json.dishes.length) {
                setNull(true);
                enqueueSnackbar( 'No dishes', { variant: 'warning' });
                
                return false;
            }
            
            setChildren(json.dishes.map((card) => {

                return <Card
                        key={card.id}
                        name={card.name}
                        description={card.description}
                        price={card.price}
                        image={card.image}
                        vegetarian={card.vegetarian}
                        rating={card.rating}
                        category={card.category}

                        onClick={() => {
                            nav(`/dish/${dish.id}`);
                        }}
                        onBasket={() => {
                            fetchData(new URL(`/api/basket/dish/${movie.id}`, _.api_server), {}, 'POST').then((data) => {
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
                        }}
                    />;
            }));
        })();
    }, [currPage]);

    return <>
        <Box sx={(theme) => theme.palette.pages.main.Main.bg}>
            <Header/>
            <Box padding={2} sx={{display: "flex", flexWrap: "wrap", gap: 2, flexFlow: "row wrap", alignItems: "stretch", justifyContent: "space-around"}}>
                
                { children
                /* <Movie page={parseInt(id ?? 1)} /> */}
            </Box>
            <Pagination size={pageCount} />
        </Box>
    </>;
}

