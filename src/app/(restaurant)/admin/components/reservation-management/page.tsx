'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image'
import { Typography } from '@mui/material';
import ReservationTable from '../reservation-table';
import { AdminContextProvider, useAdminContext } from '@/app/contexts/adminContext';
import ReservationListCard from '../reservation-list-cards-old';

export default function ReservationManagement() {

  return (
    <AdminContextProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', gap: 4, minWidth: 200, width: '80%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
        <Typography variant='h5' color="text.primary">
          Olá! Você está no restaurante Morada do Sabor 🍴🍺🍝
        </Typography>
{/*         <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 4, minWidth: 500, width: '60%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
          <ReservationTable />
        </Box> */}
        <ReservationListCard />
      </Box>
    </AdminContextProvider>
  )
}
