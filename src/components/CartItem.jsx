import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Input from '@mui/material/Input';
import { useState } from 'react'

export default function CartItem() {
    const [ qtd, setQtd ] = useState(0);
    const [ price, setPrice ] = useState(100);
    const handleAddQtd = () => {
        setQtd(qtd + 1);
    }

    const handleSubQtd = () => {
        if(qtd > 0) setQtd(qtd - 1);
        // se nao, remover item do carrinho
    }

    return (
        <Container sx={{ display: 'flex', maxWidth: '40%' }}>
        <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://moveiseeletrofriburgo.vteximg.com.br/arquivos/ids/172993-1000-1000/922-fundo-branco.jpg?v=638234741212530000"
        alt="Live from space album cover"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto', justifyContent: 'space-between' }}>
            <Typography component="div" variant="h6">
                Nome do produto
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
                defaultValue={ qtd } value={qtd} onChange={(e) => setQtd(e.target.value)}
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
                R$ {price.toFixed(2)}
            </Typography>
            {/* <Typography variant="subtitle1" color="text.secondary" component="div">
                Valor sem desconto
            </Typography> */}
        </CardContent>
                    </Box>

</Container>
    )
}
