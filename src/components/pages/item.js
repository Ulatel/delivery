import React, {useEffect, useState } from "react";
import Center from '../Center'
import Header from '../app/Header';
import Item from "../app/Item";
import ThemeInvetor from "../app/ThemeInvetor";
import { Box } from '@mui/material';
import { useSnackbar } from "notistack";

import _ from '../../../config'
import fetchData from "../../utils/fetchData";

export default function ({ }) {
    //const [ ratingDish, setRatingDish ] = useState(rating);
    const { enqueueSnackbar } = useSnackbar();
    let id = "4ee393fc-af18-4636-be23-08dac7a0ede1";
    let json;
    const [ children, setChildren ] = useState([]);
    
    useEffect(() => {
    (async () => {
        
        
        try{
        json = await fetchData((new URL(`/api/dish/${id}`, _.api_server)), {}, 'GET');
        }
        catch(e){
            enqueueSnackbar(e.message, {variant:'error'})
            return false;
        }
        //setLoading(false);
        console.log(json);
        
        
        /*if (!json.dishes.length) {
            setNull(true);
            enqueueSnackbar( 'No dish inform', { variant: 'warning' });
            
            return false;
        }
        */
        setChildren(((card) => {

            return <Item
                    key={json.id}
                    id={json.id}
                    name={json.name}
                    description={json.description}
                    price={json.price}
                    image={json.image}
                    vegetarian={json.vegetarian}
                    rating={json.rating}
                    category={json.category}

                />;
        }));
    })();
}, [id]);


    return <>
        <Box sx={(theme) => theme.palette.pages.main.Main.bg}>
            <Header />
            <ThemeInvetor>
                <Box padding={2}>
                    <Center>
                        { children
                        /*<Item key={json.id}
                    id={json.id}
                    name={json.name}
                    description={json.description}
                    price={"1233"}
                    image={"https://funik.ru/wp-content/uploads/2018/10/17478da42271207e1d86.jpg"}
                    vegetarian={"1"}
                    rating={9}
                    category={"Wok"}/>*/}
                    </Center>
                </Box>
            </ThemeInvetor>
        </Box>
    </>;
}