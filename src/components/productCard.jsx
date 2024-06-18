import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import { Creators as CartActions } from "../store/ducks/cart";
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';


function ProductCard({ name = "Default Name", description = "Default Description", image, price = "0.00", id }) {
  const dispatch = useDispatch();
  // console.log("Props em ProductCard:", { name, description, image, price });
  const [openAlert, setOpenAlert] = React.useState(false);
  const vertical = 'bottom';
  const horizontal = 'center';

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };


  const handleAddToCart = () => {
    console.log("Adicionando ao carrinho:", { name, description, image, price, id });
    dispatch(CartActions.addToCart({ name, description, image, price, id }));
    handleClickAlert({ vertical: 'bottom', horizontal: 'center' });
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia component="img" sx={{ height: "100%" }} image={image || "https://via.placeholder.com/150"} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
          <Typography variant="bo dy1" color="text.primary">
            R${price}
          </Typography>
          <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleAddToCart}>
            <ShoppingCartIcon color="#ccc"/>
          </Button>
          <Snackbar 
          open={openAlert} 
          autoHideDuration={6000} 
          onClose={handleCloseAlert} 
          anchorOrigin={{ vertical, horizontal}}
          >
          <Alert
            onClose={handleCloseAlert}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
            key={vertical + horizontal}

          >
            Produto adicionado ao carrinho!
          </Alert>
      </Snackbar>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.string,
};

export default ProductCard;