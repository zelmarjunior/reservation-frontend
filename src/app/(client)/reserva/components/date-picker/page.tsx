'use client';
import * as React from 'react';
import dayjs from 'dayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useReservationContext } from '../../../../contexts/reservationContext';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function DatePicker() {

  const { setSelectedDate } = useReservationContext();

  const handleselectedDate = (date: any) => { 
    const newDate = new Date(date).toLocaleDateString('pt-br', {year: "numeric", month: "numeric", day: "numeric"});
    setSelectedDate(newDate);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', minWidth: 300, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
      <Typography color={'black'} variant='h4' textAlign={'center'} fontWeight={'bold'}>Para qual dia é sua reserva? 🗓️</Typography>
      <br />
      <br />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="portrait"
          disablePast={true}
          defaultValue={dayjs(Date())}
          onChange={(date) => {handleselectedDate(date);
          }}
          sx={{ color: '#0009' }}
        />
      </LocalizationProvider>
    </Box>
  )
}
