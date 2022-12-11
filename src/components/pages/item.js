import React, {useEffect, useState } from "react";
import Center from '../Center'
import Header from '../app/Header';
import Item from "../app/Item";
import ThemeInvetor from "../app/ThemeInvetor";
import { Box } from '@mui/material';


export default function ({ }) {
    //const [ ratingDish, setRatingDish ] = useState(rating);
    //const { enqueueSnackbar } = useSnackbar();
    let id = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
   /* useEffect(() => {
    (async () => {
        let json;
        console.log(currPage);
        try{
        json = await fetchData((new URL(`/api/dish/${id}`, _.api_server)), {}, 'GET');
        }
        catch(e){
            enqueueSnackbar(e.message, {variant:'error'})
            return false;
        }
        //setLoading(false);
        console.log(json?.pagination);
        setPageCount(json?.pagination?.count);
        
        if (!json.dishes.length) {
            setNull(true);
            enqueueSnackbar( 'No dish inform', { variant: 'warning' });
            
            return false;
        }
        
        setChildren(json.dishes.map((card) => {

            return <Item
                    key={card.id}
                    id={card.id}
                    name={card.name}
                    description={card.description}
                    price={card.price}
                    image={card.image}
                    vegetarian={card.vegetarian}
                    rating={card.rating}
                    category={card.category}

                />;
        }));
    })();
}, [id]);

*/
    return <>
        <Box sx={(theme) => theme.palette.pages.main.Main.bg}>
            <Header />
            <ThemeInvetor>
                <Box padding={2}>
                    <Center>
                        <Item key={id}
                    id={id}
                    name={"ddsfdf"}
                    description={"hgsfsdgfjdsagfk agjf ghasdjfhgdsjfg hdf asdfsadjflsf"}
                    price={"1233"}
                    image={"https://funik.ru/wp-content/uploads/2018/10/17478da42271207e1d86.jpg"}
                    vegetarian={"1"}
                    rating={9}
                    category={"Wok"}/>
                    </Center>
                </Box>
            </ThemeInvetor>
        </Box>
    </>;
}