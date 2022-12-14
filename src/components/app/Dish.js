import React, {useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import CardActionArea from '@mui/material/CardActionArea';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import { Icon, Box } from '@mui/material';
import { positions } from '@mui/system';
import fetchData from "../../utils/fetchData";
import { useSnackbar } from "notistack";

import _ from '../../../config';
import "../../less/pages/main.less";



export default function({ id, name, category, price, image, vegetarian, rating, description }){
    const [ ratingDish, setRatingDish ] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    
    useEffect(() => {
      //setLoading(true);
      
      (async () => {if(window.SuperGlobal.auth[0] && ratingDish){
          let json;
          try{
          json = await fetchData((new URL(`/api/dish/${id}/rating/check`, _.api_server)), {}, 'GET');
          }
          catch(e){
              enqueueSnackbar(e.message, {variant:'error'})
              return false;
          }
          //setLoading(false);
          console.log(json);
          if (json.toString()!="false") {
            try{
            await fetchData((new URL(`/api/dish/${id}/rating`, _.api_server)), {ratingDish}, 'POST');
            }
            catch(e){
                enqueueSnackbar(e.message, {variant:'error'})
                return false;
            }
          }
          
      }})();
  }, [ratingDish]);

    return <>
        <Box sx={{ maxWidth: 600, minWidth: 100, flexGrow: 1, flexShrink: 1, margin:"auto"}}>
        <Typography sx={(theme) => theme.palette.pages.main.H3}>{name}</Typography>
                
        <Box sx={{position: "relative"}}><CardMedia
          component="img"
          max-height="100"
          min-height="100"
          sx = {{maxWidth: 500, margin:"auto"}}
          image={image}
          alt="meal img"
          /></Box>
        
        <Typography sx ={{"textAlign": "center"}} variant="body2" color="text.secondary" margin="auto" >
            Категория блюда - {category}
            
          </Typography>

          <Typography sx ={{"textAlign": "center"}} variant="body2" color="text.secondary" margin="auto" >
            {(vegetarian) && "Вегетарианское" || (!vegetarian) && "Не вегетарианское" }
          </Typography>
          

          <Typography sx ={{"textAlign": "center"}} variant="body2" color="text.secondary" margin="auto" >
            {description}
          </Typography>
          <Stack spacing={1}>
            <Rating sx={{margin: "auto"}} name="customized-10" defaultValue={rating} precision={0.1} max={10} value={rating} 
              onChange={(e, value)=>{if(window.SuperGlobal.auth[0]) setRatingDish(value); if(!window.SuperGlobal.auth[0]) enqueueSnackbar(e.message, {message: "вы не зарегистрирваны"})}}/>
            </Stack>

            <Typography sx ={{"fontWeight": "bold","textAlign": "center"}} variant="body2" color="text.secondary" margin="auto" >
            Цена - {price}
          </Typography>
    </Box>
    </>;
}