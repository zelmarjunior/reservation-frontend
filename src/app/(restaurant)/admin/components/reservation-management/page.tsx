'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { AdminContextProvider } from '@/app/contexts/adminContext';
import ReservationListCard from '../reservation-list-cards-old';

export default function ReservationManagement() {

  return (
    <AdminContextProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', gap: 4, minWidth: 200, width: '80%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
        <Typography variant='h5' color="text.primary">
          Olá! Você está no restaurante Morada do Sabor 🍴🍺🍝
        </Typography>
        <ReservationListCard />
      </Box>
    </AdminContextProvider>
  )
}
