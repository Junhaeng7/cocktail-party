import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }} onClick={props.onClick} className="ActionCard">
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          src={props.img}
          alt="Rooster"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.cardTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.cardSubtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}