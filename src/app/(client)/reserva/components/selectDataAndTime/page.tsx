'use client';
import * as React from 'react';
import DatePicker from '../../components/date-picker/page';
import TimePicker from '../time-picker-buttons/page';
import SeatsPicker from '../seats-picker/page';
import { ReservationContextProvider, ReservationContext, useReservationContext } from '../../../../contexts/reservationContext';

export default function SelectDataAndTime() {
  const { selectedDate, selectedTime, selectedSeats } = useReservationContext();

  return (
    <>
      {!selectedDate && <DatePicker />}
      {selectedDate && !selectedTime && <TimePicker />}
      {selectedDate && selectedTime && <SeatsPicker />}
    </>
  )
}
