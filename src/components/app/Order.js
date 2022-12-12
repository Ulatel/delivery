import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function({ id, name, price, deliveryTime, orderTime, status}) {
    
  return (
    <Card sx={{ maxWidth: 900, position: "relative", flexWrap: "wrap",  flexFlow: "row wrap", alignItems: "stretch"}}>
      <CardActions>
      
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
      <CardContent>
      <Button sx={{marginRight: 5, color:"red"}}>Подтвердить заказ</Button>
      <Typography variant="body2" color="text.secondary" margin="right">
          Цена:  {price}
        </Typography>
      </CardContent>
      </CardActions>
    </Card>
  );
}