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
import CardActions from '@mui/material/CardActions';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Button from '@mui/material/Button';

import { useNavigate } from "react-router-dom";
import _ from '../../../config'


export default function ({id,name,category,price,image,vegetarian,rating, description,  outBasket, inBasket, changeRating}) {


    const { enqueueSnackbar } = useSnackbar();
    const nav = useNavigate();
    const [inBa, setInBa] = React.useState(0);
  



  return (
    <Card sx={{position: "relative", maxWidth: 300, minWidth: 50, flexGrow: 1, flexShrink: 1}}  onClick={()=>{nav(`/dish/${id}`)}}>
      <CardActionArea >
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
            <Rating name="customized-10" defaultValue={rating} precision={0.1} max={10} onClick={(event)=>{ event.stopPropagation()}} onChange={(event,value)=>{ console.log(value);changeRating(id, value);  }}/>
            </Stack>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          
        </CardContent>
        {<Box sx={{height: "30px"}}/>}
      </CardActionArea>

      {(window.SuperGlobal.auth[0])&&
                                
      <CardActions sx={{position:"absolute", bottom: "0", right:"0"}}>
        <Typography sx={{left:"0"}}>Цена: {price} </Typography>
        { inBa>0 && <>
          <Button size="small" onClick={(event)=>{event.stopPropagation();setInBa(inBa-1); outBasket(id, () => { inBa<1? "false": "true"})} }><RemoveCircleOutlineIcon/></Button>
          <Typography>{inBa}</Typography>
        <Button size="small" onClick={(event)=>{event.stopPropagation();setInBa(inBa+1); inBasket(id); } }><ControlPointIcon/></Button>
        </>}
        {
        (inBa==0) && <>
        <Button size="small" onClick={(event)=> {if(window.SuperGlobal.auth[0]){event.stopPropagation(); inBasket(id); setInBa(inBa+1)} else nav(`/login`)}}> В корзину </Button>
        </>}
      </CardActions>
      }
    </Card>
  );
}