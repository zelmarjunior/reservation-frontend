'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useReservationContext } from '@/app/contexts/reservationContext';

export default function ReservationModal(props) {
  const { open, setOpen } = props;
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime } = useReservationContext();
  const [confirmation, setConfirmation] = React.useState(false);
  const router = useRouter();

  const handleClose = () => {
    setSelectedTime('');
    setOpen(false)
  };
  const API_URL = "http://localhost:3333/reservation/create";

  const createReservation = async (selectedDate, selectedTime) => {
    console.log("inicia getTimes", selectedDate, selectedTime)

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: selectedDate,
        restaurantId: 1
      })
    });

    if (response.ok) {
      const data = await response.json();
      setTimes(data.times);
      console.log('Response Data', data)
      console.log('Horarios para renderizar', times)
    } else {
      throw new Error(response.statusText);
    }
  };

  const handleReservation = () => {

    setConfirmation(true);
    setTimeout(() => {
      setSelectedTime('');
      setConfirmation(false);
      setOpen(false);
      router.push('/');
    }, 5000);
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
            <h1>Reserva realizada!</h1>
          ) : (
            <>
              <h1>Reserva</h1>
              <h3 style={{ color: 'black' }}>{selectedTime}</h3>
              <TextField label="Nome" variant="outlined" />
              <TextField label="Telefone" variant="outlined" />
              <TextField label="Lugares" variant="outlined" />
              <Button onClick={handleReservation} variant="contained">Reservar</Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  )
}