'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Image from 'next/image'
import styles from './page.module.css'
import Divider from '@mui/material/Divider';
import { TextField } from '@mui/material';
import { useReservationContext } from '@/app/contexts/reservationContext';
import ReservationModal from '../reservation-modal';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';




export default function TimePicker() {
  const [open, setOpen] = React.useState(false);
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime } = useReservationContext();
  const [confirmation, setConfirmation] = React.useState(false);
  const [times, setTimes] = React.useState([]);

  const router = useRouter();

  const handleOpen = (e) => {
    console.log('Horário Selecionado: ', e.target.textContent)
    setOpen(true);
    setSelectedTime(e.target.textContent);
  };

  const API_URL = "http://localhost:3333/reservation/getTimes";

  const getTimes = async (selectedDate) => {
/*     console.log("inicia getTimes", selectedDate)

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
    } */
  };

  React.useEffect(() => {
    //getTimes(selectedDate);
  }, [])

  React.useEffect(() => {
    console.log('mudou o times');

  }, [times])

  const renderTimeButtons = () => {
    console.log('renderbuttons', times)
    return (times.map((time) => {
      return <Button key={React.useId()} onClick={handleOpen} color='success' variant="outlined" disabled={time.total_reservations > 10}>{time.reservation_time}</Button>
    }))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', minWidth: 300, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
      <h1>Para qual dia é sua reserva?</h1>
      <br />
      <br />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <StaticTimePicker  minutesStep={10} minTime={dayjs('2022-04-17T15:30')} maxTime={dayjs('2022-04-17T18:30')} defaultValue={dayjs('2022-04-17T15:30')} ampm={true} orientation={'landscape'} /> */}

      </LocalizationProvider>
    </Box>
  )
}