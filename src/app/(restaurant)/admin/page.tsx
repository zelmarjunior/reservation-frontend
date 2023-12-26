'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image'
import { Typography } from '@mui/material';
import ReservationTable from './components/reservation-table';
import { AdminContextProvider } from '@/app/contexts/adminContext';
import ReservationListCard from './components/reservation-list-cards-old';

export default function AdminPainel() {
  return (
    <AdminContextProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 4, minWidth: 400, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
        <Typography variant='h5' color="text.primary">
          Olá! Você está no Restautante tal.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 4, minWidth: 500, width: '60%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
          <ReservationTable />
        </Box>
        <ReservationListCard />
      </Box>
    </AdminContextProvider>
  )
}
