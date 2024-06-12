import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CartItem from '../components/CartItem';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function Cart() {
    const subtotal = () => (
        <Typography variant="h6" component="div" align="left" sx={{ m: 2 }}>
             Subtotal (x itens): 
            <Typography variant="h6" component="span" align="left" fontWeight="bold" sx={{m: 1}}>
                 R$ 200,00
            </Typography>
            </Typography>
    )

    return (
        <Container maxWidth="lg" sx={{ maxHeight: 'fit-content' }}>
            <Box sx={{ height: '100vh' }} >
                <Typography variant="h3" component="h2" align="left" fontWeight="bold" sx={{ m: 2 }}>
                    Carrinho de compras
                </Typography>
                <Divider />
                <Grid container spacing={2}>
        <Grid item xs={8}>
                <CartItem />
                <Divider />
        <CartItem />
                <Divider />
            { subtotal() }
        </Grid>
        <Grid item xs={4}>
        <Box sx={{ m: 2, p: 2 }} bgcolor={"#f5f5f5"}>
            { subtotal() }
            <Button>Fechar pedido</Button>
        </Box>
        </Grid>
        </Grid>
            </Box>
        </Container>
    )
}

