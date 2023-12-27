'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image'
import { Typography } from '@mui/material';
import ReservationTable from './components/reservation-table';
import { AdminContextProvider, useAdminContext } from '@/app/contexts/adminContext';
import ReservationListCard from './components/reservation-list-cards-old';
import Login from './components/login/page';
import ReservationManagement from './components/reservation-management/page';

export default function Admin() {

  return (
    <AdminContextProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 4, minWidth: 400, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
        <ReservationManagement />
      </Box>
    </AdminContextProvider>
  )
}
