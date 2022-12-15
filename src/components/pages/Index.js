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
    let params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page")??"1");
    let a = (params.toString());
    console.log(a);
    a = a.replace(/page=\d+&?/, '');
    console.log(a);
    const [ currPage, setCurrPage ] = useState(page ?? 1);
    const [ pageCount, setPageCount ] = useState(1);
    const [ filters, setFilters ] = useState("");
    const [ children, setChildren ] = useState([]);
    const [ isNull, setNull ] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const nav = useNavigate();
    const [ urlPag, setURLpag] = useState(`?page=${page}`);
    //console.log(params.getAll("categories", "sorting", "vegetarian")??"");
    //params.delete("page");
    //let regex = /\&.*/;
    //let matches = a.match(regex);
    //console.log((params).toString());
    const [ urlFilt, setURLfilt] = useState(a);
    
    useEffect(() => {
        //setLoading(true);
        
        (async () => {
            setCurrPage(page);
            let json;
            console.log(urlPag.toString()+urlFilt.toString());
            try{
            json = await fetchData((new URL(`/api/dish/${urlPag}${"&"+urlFilt}`, _.api_server)), {}, 'GET');
            }
            catch(e){
                enqueueSnackbar(e.message, {variant:'error'})
                return false;
            }
            //console.log((new URL('/api/dish/?${urlFilt}${urlPag}', _.api_server).toString));
            //setLoading(false);
            console.log(json);
            setPageCount(json?.pagination?.count);
            
            if (!json.dishes.length) {
                setNull(true);
                enqueueSnackbar( 'No dishes', { variant: 'warning' });
                
                return false;
            }
            
            setChildren(json.dishes.map((card) => {

                return <Card
                        key={card.id}
                        id={card.id}
                        name={card.name}
                        description={card.description}
                        price={card.price}
                        image={card.image}
                        vegetarian={card.vegetarian}
                        rating={card.rating}
                        category={card.category}
                        changeRating={async(id, val)=> {
                            let json;
                            try{
                            json = await fetchData((new URL(`/api/dish/${id}/rating/check`, _.api_server)), {}, 'GET');
                            }
                            catch(e){
                                enqueueSnackbar(e.message, {variant:'error'})
                                return false;
                            }
                            //setLoading(false);
                            console.log(json)
                            console.log(val);
                            if (json) {
                                try{
                                fetchData((new URL(`/api/dish/${id}/rating`, _.api_server)), {val}, 'POST');
                                }
                                catch(e){
                                    enqueueSnackbar(e.message, {variant:'error'})
                                    return false;
                                }

                                enqueueSnackbar(`${'added to' } rating`, { variant: 'success' });
                            }
                            else{
                                enqueueSnackbar(`вы этого не заказывали`, { variant: 'error' });
                            }
                        }}
                        inBasket={(id)=>{
                            fetchData(new URL(`/api/basket/dish/${id}`, _.api_server), {dishId : id}, 'POST').then((data) => {
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
                          
                            console.log("из корзины")
                          }}
                    />;
            }));
        })();
    }, [urlFilt, urlPag, urlFilt]);

    console.log(page);
    return <>
        <Box sx={(theme) => theme.palette.pages.main.Main.bg}>
            <Header/>
            <LimitTags urlPag={urlPag} setURLpag={setURLpag} setCurrPage ={setCurrPage} setURL={setURLfilt} />
                
            <Box padding={2} sx={{display: "flex", flexWrap: "wrap", gap: 2, flexFlow: "row wrap", alignItems: "stretch", justifyContent: "center"}}>
                
                { children
                /* <Movie page={parseInt(id ?? 1)} /> */}
            </Box>
            <Box sx={{display: "table", margin: "0 auto"}}>
                <PaginationRounded urlFilt={urlFilt} pageid={currPage} count={pageCount} setCurrPage ={setCurrPage} setURL={setURLpag} />
            </Box>
        </Box>
    </>;
}

