'use client';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useReservationContext } from '@/app/contexts/reservationContext';
import ReservationModal from '../reservation-modal';

export default function TimePickerButtons() {
  const [open, setOpen] = React.useState(false);
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime, selectedSeats, setSelectedSeats, showRecommendations, setShowRecommendations} = useReservationContext();
  const [confirmation, setConfirmation] = React.useState(false);
  const [times, setTimes] = React.useState([]);
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSeats(event.target.value)
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
        setShowRecommendations(true);
      }
    } else {
      throw new Error(response.statusText);
    }
  };



  const listTimes = ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'];
  const listSeats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const renderSeatOptions = () => {
    console.log('renderbuttons', times)
    return (listSeats.map((seat, index) => {
      return <MenuItem value={seat[index]}>{seat[index]}</MenuItem>
    }))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', minWidth: 300, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
      <Stack direction="row" spacing={2} useFlexGap={true} sx={{ padding: '30px', backgroundColor: '#f6f6f6', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', minWidth: 350, maxWidth: 350, justifyContent: 'space-evenly', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
        <h2 style={{ color: 'black', paddingBottom: '30px', textAlign: 'center' }}>Quantos lugares seria?</h2>
        <FormControl sx={{ width: '120px' }}>
          <InputLabel id="seats">Lugares</InputLabel>
          <Select
            labelId="seats"
            id="seats"
            value={selectedSeats}
            label="Lugares"
            onChange={handleChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={'Mais lugares'} disabled>Mais? Entre em contato</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={verifyAvailability} color='success' variant="outlined" disabled={false} sx={{ fontSize: '12px' }}>Verificar Disponibilidade</Button>
      </Stack>
      <ReservationModal open={confirmation} setOpen={setConfirmation} />
    </Box>
  )
}
