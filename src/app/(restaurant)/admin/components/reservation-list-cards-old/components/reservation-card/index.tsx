import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { useAdminContext } from '@/app/contexts/adminContext';

export interface ReservationInfo {
  reservation_date: string,
  reservation_id: number,
  reservation_time: string,
  reservation_seats: string,
  restaurant_id: string,
  user_customer_phone: string,
  user_customer_username: string,
}

export default function ReserationCard({ reservationInfo }: { reservationInfo: ReservationInfo }) {
  

  const {setOnDeleteReservation, setSelectedDateViewer, selectedDateToViewReservation} = useAdminContext();
  const API_URL_DELET = "http://localhost:3333/reservation/delete";
  console.log(process.env.NEXT_PUBLIC_ANEVAILABILITY_API_URL);

  const API_URL = "http://localhost:3333/reservation/list";

  const getTimes = async () => {
    console.log('data do inciio do role', selectedDateToViewReservation);
    let formattedDate = '';
    if (selectedDateToViewReservation === null) {
      formattedDate = new Date().toLocaleDateString('pt-br', { year: "numeric", month: "numeric", day: "numeric" });
      setSelectedDateViewer(formattedDate);
    } else {
      setSelectedDateViewer(selectedDateToViewReservation);
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: selectedDateToViewReservation || formattedDate,
        restaurantId: 1
      })
    });

    if (response.ok) {
      const reservationObject = await response.json();
      setReservations(reservationObject);
      console.log(reservationObject)
    } else {
      throw new Error(response.statusText);
    }
  };

  const deleteReservation = async (id) => {
    const response = await fetch(API_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        restaurantId: 1
      })
    });
  };

  const handleDeleteReservation = async (id) => {
    try {
      await deleteReservation(id);
      setOnDeleteReservation(true);
    } catch (error) {
      console.log('Erro ao deletar reserva', error);
    }
  }

  return (
    <Card sx={{ minWidth: 180, backgroundColor: '#f8f8f8' }}>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          #Reserva: {reservationInfo?.reservation_id}
        </Typography>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Box display={'flex'} flexDirection={'column'}>
            <Typography sx={{ fontSize: 8 }} color="text.secondary" gutterBottom>
              Nome
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              {reservationInfo?.user_customer_username}
            </Typography>
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'column'}>
          <Typography sx={{ fontSize: 8 }} color="text.secondary" gutterBottom>
            Telefone
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
            {reservationInfo?.user_customer_phone}
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Box display={'flex'} flexDirection={'column'}>
            <Typography sx={{ fontSize: 8 }} color="text.secondary" gutterBottom>
              Quantos lugares?
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              {reservationInfo?.reservation_seats}
            </Typography>
          </Box>
          <Box display={'flex'} flexDirection={'column'}>
            <Typography sx={{ fontSize: 8 }} color="text.secondary" gutterBottom>
              Horário
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              {reservationInfo?.reservation_time}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleDeleteReservation(reservationInfo.reservation_id)}>Cancelar Reserva</Button>
      </CardActions>
    </Card>
  );
}