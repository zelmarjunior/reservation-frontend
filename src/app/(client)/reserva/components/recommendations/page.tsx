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
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime, selectedSeats, setRecommendationLists, setShowRecommendations, recommendationLessBusy, setRecommendationLessBusy, recommendationNearest, setRecommendationNearest, setSelectedSeats, showRecommendations, recommendationsByHistory, setRecommendationsByHistory } = useReservationContext();
  const [confirmation, setConfirmation] = React.useState(false);
  const [times, setTimes] = React.useState([]);

  const router = useRouter();

  const handleOpen = (e) => {
    console.log('Horário Selecionado: ', e.target.textContent)
    setOpen(true);
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
      console.log('ai caralho', data);

      setRecommendationNearest(data[0].nearestRecommendation)
      setRecommendationLessBusy(data[0].lessBusyTimeRecommendation)
      setRecommendationsByHistory(data[0].historyByTimeRecommendation)

    } else {
      throw new Error(response.statusText);
    }
  };

  React.useEffect(() => {
    getRecommendations();
  }, [])

  const listTimes = ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00']

  /*   const renderLessBusy = () => {
      console.log('renderbuttons', recommendationLessBusy)
      return (recommendationLessBusy.map((time) => {
        return <Button key={React.useId()} onClick={handleOpen} color='success' variant="outlined" disabled={false}>{time}</Button>
      }))
    }
  
    const renderNearest = () => {
      return (recommendationNearest.map((time) => {
        return <Button key={React.useId()} onClick={handleOpen} color='success' variant="outlined" disabled={false}>{time}</Button>
      }))
    } */
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
  React.useEffect(() => {
    console.log('www', times);
  }, [times]);

  const get = () => {
    const id = React.useId();
    return id;
  }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', minWidth: 300, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
      <Stack direction="row" spacing={2} useFlexGap={true} sx={{ padding: '30px', backgroundColor: '#f6f6f6', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', minWidth: 350, maxWidth: 350, justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
        <h3 style={{ color: 'black', paddingBottom: '10px', textAlign: 'center' }}>O horário não está disponível para {selectedSeats} pessoas... 😒</h3>
        <h5 style={{ color: 'black', paddingBottom: '10px', textAlign: 'center' }}>Dia: {String(selectedDate)}</h5>
        <h5 style={{ color: 'black', paddingBottom: '10px', textAlign: 'center' }}>Horário: {String(selectedTime)}</h5>
        <h5 style={{ color: 'black', paddingBottom: '10px', textAlign: 'center' }}>Veja sugestões especiais para você!</h5>
        {recommendationLessBusy && recommendationLessBusy?.map((item, index) => {
          if (item?.time) {
            return <Button key={index} onClick={handleOpen} color='success' variant="outlined" disabled={false}>{item?.time}</Button>
          }
        })}
        <br />
        <h5 style={{ color: 'black', paddingBottom: '10px', textAlign: 'center' }}>Segestões mais próximas ao seu horário...</h5>
        {recommendationNearest && recommendationNearest?.map((item, index) => {
          if (item?.time) {
            return <Button key={index} onClick={handleOpen} color='success' variant="outlined" disabled={false}>{item?.time}</Button>
          }
        })}
        <h5 style={{ color: 'black', paddingBottom: '10px', textAlign: 'center' }}>Veja também: Horários com menos ocupação</h5>
        {recommendationsByHistory && recommendationsByHistory?.map((item, index) => {
          if (item?.time) {
            return <Button key={index} onClick={handleOpen} color='success' variant="outlined" disabled={false}>{item?.time}</Button>
          }
        })}
        <Button onClick={() => {
          setSelectedDate('');
          setSelectedTime('');
          setSelectedSeats('');
          setShowRecommendations(false);
        }} aria-label="fingerprint" color="success">
          <p>🔙 Escolher outro dia</p>
        </Button>
        {/* <Button onClick={verifyAvailability} color='success' variant="outlined" disabled={false} sx={{ fontSize: '12px' }}>Verificar Disponibilidade</Button> */}
      </Stack>
      <ReservationModal open={open} setOpen={setOpen} />
    </Box>
  )
}
