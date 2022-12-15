import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function({ id, name, totalPrice, price, amount, image}) {
    return <>
    <Card sx={{  flexDirection: "column", position: "relative", flexWrap: "wrap",  flexFlow: "row wrap", alignItems: "stretch", maxWidth: 900,  alignItems: "stretch", display: "flex", flexWrap: "wrap", justifyContent: "space-between",  flexFlow: "row wrap"}}>
      <CardActions sx={{  flexDirection: "column",maxWidth: 900,  alignItems: "stretch", display: "flex", flexWrap: "no-wrap", justifyContent: "space-between",  flexFlow: "row wrap"}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        sx={{maxWidth: "250px"}}
        image = {image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Цена/шт: {price} руб.
        </Typography>
      </CardContent>
      
      </CardActions>
    </Card>
    </>
}