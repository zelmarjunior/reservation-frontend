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
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime, selectedSeats, setRecommendationLists, recommendationLessBusy, setRecommendationLessBusy, recommendationNearest, setRecommendationNearest } = useReservationContext();
  const [confirmation, setConfirmation] = React.useState(false);
  const [times, setTimes] = React.useState([]);

  const router = useRouter();

  const handleOpen = (e) => {
    console.log('Horário Selecionado: ', e.target.textContent)
    //setOpen(true);
    setSelectedTime(e.target.textContent);
  };

  const API_URL = "http://localhost:3333/reservation/recommendations";

  const getRecommendations = async () => {
    const response = await fetch(API_URL, {
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

      console.log('zelmaaaaar aNTES', recommendationLessBusy);
      setRecommendationLessBusy(data.lessBusyTimesRecommendation);
      setRecommendationNearest(data.lessBusyTimesRecommendation)
      console.log('zelmaaaaar DEPOS', recommendationLessBusy);
    } else {
      throw new Error(response.statusText);
    }

  };

  React.useEffect(() => {
    getRecommendations();
  }, [])

  const listTimes = ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00']

  const renderLessBusy = () => {
    console.log('renderbuttons', recommendationLessBusy)
    return (recommendationLessBusy.map((time) => {
      return <Button key={React.useId()} onClick={handleOpen} color='success' variant="outlined" disabled={false}>{time}</Button>
    }))
  }

  const renderNearest = () => {
    console.log('renderbuttons', times)
    return (recommendationNearest.map((time) => {
      return <Button key={React.useId()} onClick={handleOpen} color='success' variant="outlined" disabled={false}>{time}</Button>
    }))
  }

  React.useEffect(() => {
    console.log('www', recommendationLessBusy);
  }, [recommendationLessBusy]);

  const get = () => {
    const id = React.useId();
    return id;
  }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', minWidth: 300, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
      <Stack direction="row" spacing={2} useFlexGap={true} sx={{ padding: '30px', backgroundColor: '#f6f6f6', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', minWidth: 350, maxWidth: 350, justifyContent: 'space-evenly', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
        <h2 style={{ color: 'black', paddingBottom: '10px', textAlign: 'center' }}>O horário escolhido não está disponível 😒</h2>
        <h5 style={{ color: 'black', paddingBottom: '30px', textAlign: 'center' }}>Veja sugestões especiais para você!</h5>
        {recommendationLessBusy && recommendationLessBusy?.map((time, index) => {
          return <Button key={index} onClick={handleOpen} color='success' variant="outlined" disabled={false}>natalina</Button>
        })}
        <hr />
        <h5 style={{ color: 'black', paddingBottom: '30px', textAlign: 'center' }}>Veja sugestões especiais para você!</h5>
{/*         {recommendationNearest && recommendationNearest?.map((time) => {
          return <Button key={React.useId()} onClick={handleOpen} color='success' variant="outlined" disabled={false}>{natalina}</Button>
        })} */}
      </Stack>
      <ReservationModal open={open} setOpen={setOpen} />
    </Box>
  )
}
