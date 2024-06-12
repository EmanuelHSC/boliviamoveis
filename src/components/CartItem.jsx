import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Input from '@mui/material/Input';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Creators as CartActions } from '../store/ducks/cart'

export default function CartItem({ id }) {
    const dispatch = useDispatch();
    const item = useSelector((state) => state.cart.items.find(item => item.id === id));

    const handleAddQtd = () => {
        dispatch(CartActions.addToCart(item));
    }

    const setNewQuantity = (newQuantity) => {
        dispatch(CartActions.updateQuantity({ item, quantity: newQuantity }));
    }

    const handleSubQtd = () => {
        dispatch(CartActions.removeFromCart(item));
        // se nao, remover item do carrinho
    }

    return (
        <Container sx={{ display: 'flex', maxWidth: '40%' }}>
        <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={item.image}
        alt="Product image"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto', justifyContent: 'space-between' }}>
            <Typography component="div" variant="h6">
                {item.name}
            </Typography>
            <Container sx={{ m: 0, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button
                sx={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%', // para bordas arredondadas
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0, // remover padding interno
                    minWidth: 0, // remover largura mínima padrão do botão
                  }}
                  onClick={() => handleSubQtd()}
                >
                    -
                </Button>
                <Input sx={{width: 30, }} 
                inputProps={{ style: { textAlign: 'center' } }}
                defaultValue={ item.quantity } value={item.quantity} onChange={(e) => setNewQuantity(e.target.value)}
                key={id}
                >
                </Input>
                <Button
                sx={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%', // para bordas arredondadas
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0, // remover padding interno
                    minWidth: 0, // remover largura mínima padrão do botão
                  }}

                onClick={() => handleAddQtd()}
                >
                    +
                </Button>
            </Container>
            <Typography variant="h6" sx={{fontWeight: 'bold', marginTop: 2 }} component="div">
                R$ {item.price}
            </Typography>
        </CardContent>
                    </Box>

</Container>
    )
}
