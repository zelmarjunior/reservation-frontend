'use client';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
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


export type UserRole = 'owner' | 'editor' | 'reader';

export interface IUserAdmin {
  id?: number,
  username: string,
  password: string,
  role: UserRole
}


export interface IUserCustomer {
  id?: number,
  username: string,
  phone: number
}

export default function Recommendations() {
  const [open, setOpen] = React.useState(false);
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime } = useReservationContext();
  const [confirmation, setConfirmation] = React.useState(false);
  const [times, setTimes] = React.useState([]);

  const router = useRouter();

  const handleOpen = (e) => {
    console.log('Horário Selecionado: ', e.target.textContent)
    //setOpen(true);
    setSelectedTime(e.target.textContent);
  };

/*   const API_URL = "http://localhost:3333/reservation/getTimes";

  const getTimes = async (selectedDate) => {
    console.log("inicia getTimes", selectedDate)

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

  React.useEffect(() => {
    getTimes(selectedDate);
  }, []) */

  React.useEffect(() => {
    console.log('mudou o times');

  }, [times])

  const listTimes = ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00']

  const renderTimeButtons = () => {
    console.log('renderbuttons', times)
    return (listTimes.map((time) => {
      return <Button onClick={handleOpen} color='success' variant="outlined" disabled={false}>{time}</Button>
    }))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', minWidth: 300, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
      <Stack direction="row" spacing={2} useFlexGap={true} sx={{ padding: '30px', backgroundColor: '#f6f6f6', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', minWidth: 350, maxWidth: 350, justifyContent: 'space-evenly', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
        <h2 style={{ color: 'black', paddingBottom: '10px', textAlign: 'center' }}>O horário escolhido não está disponível 😒</h2>
        <h5 style={{ color: 'black', paddingBottom: '30px', textAlign: 'center' }}>Veja sugestões especiais para você!</h5>
        {renderTimeButtons()}
      </Stack>
      <ReservationModal open={open} setOpen={setOpen} />
    </Box>
  )
}
