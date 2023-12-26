'use client';
import * as React from 'react';
import dayjs from 'dayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useReservationContext } from '../../../../contexts/reservationContext';
import Box from '@mui/material/Box';

export default function DatePicker() {

  const { selectedDate, setSelectedDate } = useReservationContext();

  const handleselectedDate = (date: any) => {
    const newDate = new Date(date).toLocaleDateString('pt-br', {year: "numeric", month: "numeric", day: "numeric"});
    setSelectedDate(newDate);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', minWidth: 300, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
      {/* Mudar para Typography do MUI */}
      <h1>Para qual dia é sua reserva? 🗓️</h1>
      <br />
      <br />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="landscape"
          disablePast={true}
          defaultValue={dayjs(Date())}
          onAccept={((date) => {
            handleselectedDate(date);
          })}
          sx={{ color: '#0009' }}
        />
      </LocalizationProvider>
    </Box>
  )
}
