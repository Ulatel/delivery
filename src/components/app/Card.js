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

import _ from '../../../config'

export default function ({id,name,category,price,image,vegetarian,rating, description}) {
    const [ ratingDish, setRatingDish ] = useState(rating);
    const { enqueueSnackbar } = useSnackbar();
    
    useEffect(() => {
      //setLoading(true);
      
      (async () => {if(window.SuperGlobal.auth[0]){
          let json;
          try{
          json = await fetchData((new URL(`/api/dish/${id}/rating/check`, _.api_server)), {}, 'GET');
          }
          catch(e){
              enqueueSnackbar(e.message, {variant:'error'})
              return false;
          }
          //setLoading(false);
          
          if (json) {
            let json2;
            try{
            json = await fetchData((new URL(`/api/dish/${key}/rating`, _.api_server)), {ratingDish}, 'POST');
            }
            catch(e){
                enqueueSnackbar(e.message, {variant:'error'})
                return false;
            }
          }
          
      }})();
  }, [ratingDish]);


  return (
    <Card sx={{ maxWidth: 300, minWidth: 50, flexGrow: 1, flexShrink: 1}}>
      <CardActionArea>
        <Box sx={{position: "relative"}}><CardMedia
          component="img"
          height="140"
          image={image}
          alt="meal img"
          />
          {(vegetarian) &&  <Icon sx={{position: "absolute", bottom: "0", right:"0", color:"green"}}><EnergySavingsLeafIcon/></Icon>
        }
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Категория блюда - {category}
          </Typography>
          <Stack spacing={1}>
            <Rating name="customized-10" defaultValue={ratingDish} precision={0.1} max={10} value={ratingDish} onChange={(e, value)=>{if(window.SuperGlobal.auth[0])setRatingDish(value)}}/>
            </Stack>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardContent>
            
        </CardContent>
      </CardActionArea>
    </Card>
  );
}