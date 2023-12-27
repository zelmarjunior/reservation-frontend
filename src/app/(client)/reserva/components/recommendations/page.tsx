'use client';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useReservationContext } from '@/app/contexts/reservationContext';
import ReservationModal from '../reservation-modal';


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
  const router = useRouter();

  const handleOpen = (e) => {
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

      setRecommendationNearest(data[0].nearestRecommendation)
      setRecommendationLessBusy(data[0].lessBusyTimeRecommendation)
      setRecommendationsByHistory(data[0].historyByTimeRecommendation)

    } else {
      throw new Error(response.statusText);
    }
  };

  React.useEffect(() => {
    getRecommendations();
  }, []);

  const NEXT_PUBLIC_AVAILABILITY_API_URL = "http://localhost:3333/reservation/availability";//PROBLEMAS COM DOT ENV.

  const verifyAvailability = async () => {

    const response = await fetch(NEXT_PUBLIC_AVAILABILITY_API_URL, {
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
        <h5 style={{ color: 'black', paddingBottom: '10px', textAlign: 'center' }}>Veja também, horários com desconto de até 30% OFF </h5>
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
      </Stack>
      <ReservationModal open={open} setOpen={setOpen} />
    </Box>
  )
}
