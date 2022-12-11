import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function ImgMediaCard({ id, name, price, image, amount }) {
    
  return (
    <Card sx={{ maxWidth: 900, display: "inline-block", flexWrap: "wrap",  flexFlow: "row wrap", alignItems: "stretch"}}>
      <CardActions>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image = {"https://funik.ru/wp-content/uploads/2018/10/17478da42271207e1d86.jpg"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Цена/шт: {price} руб.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><RemoveCircleOutlineIcon/></Button>
        <Typography>amount</Typography>
        <Button size="small"><ControlPointIcon/></Button>
      </CardActions>
      <Button sx={{marginRight: 5, color:"red"}}>Удалить</Button>
      </CardActions>
    </Card>
  );
}