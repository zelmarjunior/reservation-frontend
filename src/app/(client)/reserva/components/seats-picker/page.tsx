'use client';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Image from 'next/image'
import styles from './page.module.css'
import Divider from '@mui/material/Divider';
import { FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useReservationContext } from '@/app/contexts/reservationContext';
import ReservationModal from '../reservation-modal';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';


export type UserRole = 'owner' | 'editor' | 'reader';

export interface IUserAdmin {
  id?: number,
  username: string,
  password: string,
  role: UserRole
}


export interface IUserCustomer {
  id?: number,
  username: string,
  phone: number
}

export default function TimePickerButtons() {
  const [open, setOpen] = React.useState(false);
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime, selectedSeats, setSelectedSeats } = useReservationContext();
  const [confirmation, setConfirmation] = React.useState(false);
  const [times, setTimes] = React.useState([]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSeats(event.target.value)
  };

  const router = useRouter();

  const handleOpen = (e) => {
    console.log('Horário Selecionado: ', e.target.textContent)
    setOpen(true);
    setSelectedTime(e.target.textContent);
  };

  const API_URL = "http://localhost:3333/reservation/availability";

  const verifyAvailability = async () => {

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: selectedDate,
        time: selectedTime,
        seats: selectedSeats,
        restaurantId: 1
      })
    });

    if (response.ok) {
      const data = await response.json();
      setConfirmation(data)
    } else {
      throw new Error(response.statusText);
    }
  };



  const listTimes = ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'];
  const listSeats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const renderSeatOptions = () => {
    console.log('renderbuttons', times)
    return (listSeats.map((seat, index) => {
      return <MenuItem value={seat[index]}>{seat[index]}</MenuItem>
    }))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', minWidth: 300, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
      <Stack direction="row" spacing={2} useFlexGap={true} sx={{ padding: '30px', backgroundColor: '#f6f6f6', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', minWidth: 350, maxWidth: 350, justifyContent: 'space-evenly', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
        <h2 style={{ color: 'black', paddingBottom: '30px', textAlign: 'center' }}>Quantos lugares seria?</h2>
        <FormControl sx={{ width: '120px' }}>
          <InputLabel id="demo-simple-select-label">Lugares</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedSeats}
            label="Lugares"
            onChange={handleChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={'Mais lugares'} disabled>Mais? Entre em contato</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={verifyAvailability} color='success' variant="outlined" disabled={false} sx={{ fontSize: '12px' }}>Verificar Disponibilidade</Button>
      </Stack>
      <ReservationModal open={confirmation} setOpen={setConfirmation} />
    </Box>
  )
}
