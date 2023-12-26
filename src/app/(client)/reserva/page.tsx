'use client';
import * as React from 'react';
import { ReservationContextProvider, ReservationContext } from '../../contexts/reservationContext';
import SelectDataAndTime from './components/selectDataAndTime/page';

export default function Reservation() {

  return (
    <ReservationContextProvider>
      <SelectDataAndTime />
    </ReservationContextProvider>
  )
}
