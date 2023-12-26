'use client';
import * as React from 'react';
import ReservationCard from './components/reservation-card';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function ReservationListCard() {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 4, minWidth: 500, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
        <Typography variant='h5' color="text.primary">
          Lista de Reservas
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 4, minWidth: 500, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
          <ReservationCard />
          <ReservationCard />
          <ReservationCard />
          <ReservationCard />
          <ReservationCard />
          <ReservationCard />
          <ReservationCard />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 4, minWidth: 500, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
        <Typography variant='h5' color="text.primary">
          Lista de Reservas 2
        </Typography>
      </Box>
    </>
  )
}
