import React, { useState, useCallback } from "react";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../components/CartItem';
import { Creators as CartActions } from '../store/ducks/cart';
import CheckoutModal from '../components/checkoutModal';

export default function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const renderItem = useCallback((item) => (
        <>
            <CartItem id={item.id}/>
            <Divider/>
        </>
    ), [cart] )

    const subtotal = () => (
        <Typography variant="h6" component="div" align="left" sx={{ m: 2 }}>
             Subtotal ({cart.items.length} {cart.items.length > 1 ? 'itens' : 'item'}): 
            <Typography variant="h6" component="span" align="left" fontWeight="bold" sx={{m: 1}}>
                {cart.total.toFixed(2)}
            </Typography>
            </Typography>
    );

    const handleCheckout = () => {
        dispatch(CartActions.checkoutSuccess());
        alert('Compra realizada com sucesso!');
    };

    return (
        <Container maxWidth="lg" sx={{ maxHeight: 'fit-content' }}>
            <Box sx={{ height: '100vh' }} >
                <Typography variant="h3" component="h2" align="left" fontWeight="bold" sx={{ m: 2 }}>
                    Carrinho de compras
                </Typography>
                <Divider />
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        { cart.items.map(renderItem)}
                        { subtotal() }
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ m: 2, p: 2 }} bgcolor={"#f5f5f5"}>
                            { subtotal() }
                            <Button variant="contained" color="primary" onClick={() => setCheckoutOpen(true)}>Fechar pedido</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <CheckoutModal 
                open={checkoutOpen} 
                onClose={() => setCheckoutOpen(false)} 
                onCheckout={handleCheckout} 
            />
        </Container>
    );
}
