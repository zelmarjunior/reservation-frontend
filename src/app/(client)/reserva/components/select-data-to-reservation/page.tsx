'use client';
import * as React from 'react';
import DatePicker from '../date-picker/page';
import TimePicker from '../time-picker/page';
import SeatsPicker from '../seats-picker/page';
import { useReservationContext } from '../../../../contexts/reservationContext';
import Recommendations from '../recommendations/page';

export default function SelectDataToReservation() {
  const { selectedDate, selectedTime, selectedSeats, showRecommendations, setShowRecommendations} = useReservationContext();
  React.useEffect(() => {
    console.log(selectedDate, selectedTime, selectedSeats, showRecommendations);
    
  }, [selectedDate, selectedTime, selectedSeats, showRecommendations])
  return (
    <>
      {!selectedDate && !showRecommendations && <DatePicker />}
      {selectedDate && !selectedTime && !showRecommendations && <TimePicker />}
      {selectedDate && selectedTime && !showRecommendations && <SeatsPicker />}
      {selectedDate && selectedTime && selectedSeats && showRecommendations && <Recommendations />}
    </>
  )
}
