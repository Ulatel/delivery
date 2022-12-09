import * as React from 'react';
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

export default function ActionAreaCard({name,category,price,image,vegetarian,rating, description}) {
    
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
            <Rating name="customized-10" defaultValue={rating} precision={0.1} max={10} />
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