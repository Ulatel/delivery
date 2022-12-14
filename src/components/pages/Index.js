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

    const [ currPage, setCurrPage ] = useState(page ?? 1);
    const [ pageCount, setPageCount ] = useState(1);
    const [ filters, setFilters ] = useState("");
    const [ children, setChildren ] = useState([]);
    const [ isNull, setNull ] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const nav = useNavigate();
    const [ urlPag, setURLpag] = useState(new URLSearchParams([["page", 1]]));
    const [ urlFilt, setURLfilt] = useState(new URLSearchParams(params.getAll("categories", "sorting", "vegetarian")??""));
    
    useEffect(() => {
        //setLoading(true);
        
        (async () => {
            setCurrPage(page);
            setURLpag(new URLSearchParams(params.get("page")??"1"));
            let json;
            console.log(currPage);
            try{
            json = await fetchData((new URL('/api/dish/?'+urlPag.toString()+"&"+urlFilt.toString(), _.api_server)), {}, 'GET');
            }
            catch(e){
                enqueueSnackbar(e.message, {variant:'error'})
                return false;
            }
            console.log((new URL('/api/dish/?${urlFilt}${urlPag}', _.api_server).toString));
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
                        amount = {0}
                        
                    />;
            }));
        })();
    }, [currPage, urlFilt]);

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
                <PaginationRounded pageid={currPage} count={pageCount} setCurrPage ={setCurrPage} setURL={setURLpag} />
            </Box>
        </Box>
    </>;
}

