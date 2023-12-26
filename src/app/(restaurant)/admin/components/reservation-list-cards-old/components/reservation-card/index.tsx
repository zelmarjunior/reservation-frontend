import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function ReserationCard() {
    return (
        <Card sx={{ minWidth: 100 }}>
            <CardContent>
                <Typography sx={{ fontSize: 8 }} color="text.secondary" gutterBottom>
                    Nome
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                    Zelmar Júnior
                </Typography>
                <Typography sx={{ fontSize: 8 }} color="text.secondary" gutterBottom>
                    Telefone
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    54996650287
                </Typography>
                <Typography sx={{ fontSize: 8 }} color="text.secondary" gutterBottom>
                    Quantos lugares?
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    3
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Cancelar Reserva</Button>
            </CardActions>
        </Card>
    );
}