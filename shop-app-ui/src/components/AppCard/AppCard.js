import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './AppCard.styles';
import image_shoope from '../../assets/images/image_shoope.jpg'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default function MediaCard({
	data = {},
	handleCart = () => { },
	handleChoose = () => { },
	className,
}) {
	const classes = useStyles();

	return (
		<Card className={[classes.AppCard, className].join(' ')}>
			<CardActionArea onClick={() => { handleChoose(data) }}>
				<CardMedia
					className={classes.media}
					image={image_shoope}
					title="Contemplative-Reptile"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">{data.title}</Typography>
					<Typography variant="body1" color="textSecondary" component="p" className={classes.content}>{data.content}</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions className={classes.rowAct}>
				<Typography gutterBottom variant="h5" component="h3" className={classes.priceLabel}>{data.price} VNĐ</Typography>
				<Button size="large" color="primary" onClick={() => handleCart(data)}>
					<ShoppingCartIcon />
				</Button>
			</CardActions>
		</Card>
	);
}
