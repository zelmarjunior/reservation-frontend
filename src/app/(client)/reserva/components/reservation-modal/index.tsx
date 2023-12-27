'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Stack, TextField } from '@mui/material';
import { useReservationContext } from '@/app/contexts/reservationContext';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function ReservationModal(props) {
  const { open, setOpen } = props;
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime, selectedSeats } = useReservationContext();
  const [confirmation, setConfirmation] = React.useState(false);
  const [name, setName] = React.useState();
  const [phone, setPhone] = React.useState();
  const router = useRouter();

  const handleClose = () => {
    setSelectedTime('');
    setOpen(false)
  };
  const API_URL = "http://localhost:3333/reservation/create";

  const createReservation = async () => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: selectedDate,
        time: selectedTime,
        seats: selectedSeats,
        restaurantId: 1,
        userCustomerId: 1
      })
    });

    if (response.ok) {
      const data = await response.json();
    } else {
      throw new Error(response.statusText);
    }
  };

  const AVAILABILITY_API_URL = "http://localhost:3333/reservation/availability";

  const verifyAvailability = async () => {
    console.log(process.env.AVAILABILITY_API_URL);

    const response = await fetch("http://localhost:3333/reservation/availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: selectedDate,
        time: selectedTime,
        seats: selectedSeats,
        restaurantId: 1
      })
    });

    if (response.ok) {
      const data = await response.json();

      if (data.isAvailability) {
        setConfirmation(true);
      } else {
        //setShowRecommendations(true);
      }
    } else {
      throw new Error(response.statusText);
    }
  };


  const handleReservation = async () => {
    await createReservation();
    setConfirmation(true);

    setTimeout(() => {
      setSelectedTime('');
      setConfirmation(false);
      setOpen(false);
      router.push('/');
    }, 3000);
  }



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', minWidth: 300, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box flexDirection={'column'} sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: '6px',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
          {confirmation ? (
            <>
              <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <h2 style={{ color: 'black', textAlign: 'center', paddingBottom: '10px' }}>Reserva realizada com sucesso!</h2>
                <h5 style={{ color: 'black' }}>Reserva para:</h5>
                <h4 style={{ color: 'black' }}>Dia: {String(selectedDate)}</h4>
                <h4 style={{ color: 'black', paddingBottom: '10px' }}>Hora: {String(selectedTime)}</h4>
                <VerifiedIcon sx={{ fontSize: '100px ' }} color='success' />
              </Stack>
            </>
          ) : (
            <>
              <h2 style={{ color: 'black', textAlign: 'center' }}>Confirme os dados para sua reserva!</h2>
              <h5 style={{ color: 'black' }}>Reserva para:</h5>
              <h4 style={{ color: 'black' }}>Dia: {String(selectedDate)}</h4>
              <h4 style={{ color: 'black' }}>Hora: {String(selectedTime)}</h4>
              <TextField label="Nome" variant="outlined" onChange={(event) => setName(event)} />
              <TextField label="Telefone" variant="outlined" onChange={(event) => setPhone(event)} />
              <Button onClick={() => handleReservation()} variant="contained">Confirmar Reserva!</Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  )
}