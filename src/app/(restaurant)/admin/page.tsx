'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { AdminContextProvider } from '@/app/contexts/adminContext';
import Login from './components/login/page';
import ReservationManagement from './components/reservation-management/page';

export default function Admin() {

  return (
    <AdminContextProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 4, minWidth: 400, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
        {/* <Login></Login> */}
        <ReservationManagement />
      </Box>
    </AdminContextProvider>
  )
}
