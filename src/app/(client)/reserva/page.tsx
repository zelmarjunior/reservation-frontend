'use client';
import * as React from 'react';
import { ReservationContextProvider } from '../../contexts/reservationContext';
import SelectDataToReservation from './components/select-data-to-reservation/page';

export default function Reservation() {
  return (
    <ReservationContextProvider>
      <SelectDataToReservation />
    </ReservationContextProvider>
  )
}
