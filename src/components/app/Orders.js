import * as React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function({ id, name, price, deliveryTime, orderTime, status, confirm}) {
  const { enqueueSnackbar } = useSnackbar();
  const nav = useNavigate();


  return (
    <Card onClick={()=>{nav(`/order/${id}`)}} sx={{display: "flex", maxWidth: 900, position: "relative", flexWrap: "wrap",  flexFlow: "row wrap", alignItems: "stretch"}}>
      <CardActionArea>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Заказ  от {orderTime}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Статус заказа - {status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Доставлен:  {deliveryTime}
        </Typography>
      </CardContent>
      <CardContent>{ status=="InProcess" && 
      <Button sx={{marginRight: 5, color:"red"}} onClick={(event)=>{confirm(id); event.stopPropagation();}}>Подтвердить заказ</Button>
    }
      <Typography variant="body2" color="text.secondary" margin="right">
          Цена:  {price}
        </Typography>
      </CardContent>
      </CardActionArea >
    </Card>
  );
}