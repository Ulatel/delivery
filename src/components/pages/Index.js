import React, {useEffect, useState } from "react";
import Header from '../app/Header';
import Card from '../app/Card';
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

import "../../less/pages/main.less";

import _ from '../../../config'

export default function({ }){
    const { id } = useParams();
    const [ currPage, setCurrPage ] = useState(id ?? 1);
    const [ pageCount, setPageCount ] = useState(1);
    const [ filters, setFilters ] = useState("");
    const [ children, setChildren ] = useState([]);
    const [ isNull, setNull ] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const nav = useNavigate();


    useEffect(() => {
        //setLoading(true);
        
        (async () => {
            let json;
            try{
            json = await fetchData((new URL(`/api/dish/?page=${currPage}${filters}`, _.api_server)), {}, 'GET');
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
                            fetchData(new URL(`/api/basket/dish/${card.id}`, _.api_server), {}, 'POST').then((data) => {
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
    }, [currPage, filters]);

    return <>
        <Box sx={(theme) => theme.palette.pages.main.Main.bg}>
            <Header/>
            <Box sx={{display: "flex",flexWrap: "wrap", gap: 2, flexFlow: "row wrap", alignItems: "stretch", justifyContent: "center"}}>
                <LimitTags/>
                <FilterSelect/>
                <FormControlLabel control={<Switch/>} label="Вегетарианское" sx={{color: "grey",  minWidth: 150 }}/>
            </Box>
            <Box padding={2} sx={{display: "flex", flexWrap: "wrap", gap: 2, flexFlow: "row wrap", alignItems: "stretch", justifyContent: "center"}}>
                
                { children
                /* <Movie page={parseInt(id ?? 1)} /> */}
            </Box>
            <Box sx={{display: "table", margin: "0 auto"}}>
                <PaginationRounded size={pageCount} setCurrPage ={setCurrPage}/>
            </Box>
        </Box>
    </>;
}

