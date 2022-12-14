import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box } from "@mui/material/Box";

export default function({ id, name, price, image, amount }) {
    
  return (
    <Card  sx={{ maxWidth: 900, flexGrow: 1,  alignItems: "stretch", display: "inline-block", flexWrap: "wrap",  flexFlow: "row wrap"}}>
      <CardActions>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        sx={{maxWidth: "250px"}}
        image = {image}
      />
      <CardContent sx={{display: "flex", justifyContent: "space-between", maxWidth: 800, alignItems: "center" , flexWrap: "wrap", flexFlow: "row wrap"}}>
      <CardContent display={"block"} sx={{flex: "1"}}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Цена: {price} руб.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Количество: {amount} 
        </Typography>
      </CardContent>
      <Typography  display={"block"} sx={{flex: "1"}}variant="body2" color="text.secondary">
          Стоимость: {amount*price} 
        </Typography>
        </CardContent>
      </CardActions>
    </Card>
  );
}