'use client';
import * as React from 'react';;
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useReservationContext } from '@/app/contexts/reservationContext';
import ReservationModal from '../reservation-modal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Typography } from '@mui/material';


export default function TimePicker() {
  const listTimes = ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'];
  const [open, setOpen] = React.useState(false);
  const { setSelectedTime, setSelectedDate, selectedDate } = useReservationContext();
  const router = useRouter();

  const handleSelectTime = (e) => {
    setSelectedTime(e.target.textContent);
  };


  const renderTimeButtons = () => {
    return (listTimes.map((time) => {
      return <Button key={React.useId()} onClick={handleSelectTime} color='success' variant="outlined" disabled={false}>{time}</Button>
    }))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', minWidth: 300, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
      <Stack direction="row" spacing={2} useFlexGap={true} sx={{ padding: '30px', backgroundColor: '#f6f6f6', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', minWidth: 350, maxWidth: 350, justifyContent: 'space-evenly', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
        <Typography variant='h5' fontSize={'14px'} color={'black'} textAlign={'center'}>
          {String(selectedDate)}
        </Typography>

        <Typography variant='h5' color={'black'} textAlign={'center'}>
          Qual horário você gostaria? ⏰
        </Typography>

        {renderTimeButtons()}
      </Stack>
      <Button onClick={() => setSelectedDate('')} aria-label="fingerprint" color="success">
        <p>🔙 Escolher outro dia</p>
      </Button>
      <ReservationModal open={open} setOpen={setOpen} />
    </Box>
  )
}
