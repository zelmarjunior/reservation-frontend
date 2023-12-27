'use client';
import * as React from 'react';
import ReservationCard from './components/reservation-card';
import Box from '@mui/material/Box';
import { Button, Popover, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import { useAdminContext } from '@/app/contexts/adminContext';
import { CalendarIcon } from '@mui/x-date-pickers';
import { useRouter } from 'next/navigation';

export default function ReservationListCard() {

  const [reservations, setReservations] = React.useState(null);

  const { selectedDateToViewReservation, setSelectedDateToViewReservation, onDeleteReservation, selectedDateViewer, setSelectedDateViewer} = useAdminContext();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const API_URL = "http://localhost:3333/reservation/list";

  const getTimes = async () => {
    console.log('data do inciio do role', selectedDateToViewReservation);
    let formattedDate = '';
    if (selectedDateToViewReservation === null) {
      formattedDate = new Date().toLocaleDateString('pt-br', { year: "numeric", month: "numeric", day: "numeric" });
      setSelectedDateViewer(formattedDate);
    } else {
      setSelectedDateViewer(selectedDateToViewReservation);
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: selectedDateToViewReservation || formattedDate,
        restaurantId: 1
      })
    });

    if (response.ok) {
      const reservationObject = await response.json();
      setReservations(reservationObject);
      console.log(reservationObject)
    } else {
      throw new Error(response.statusText);
    }
  };


  React.useEffect(() => {
    getTimes();
  }, [selectedDateToViewReservation]);

  const handleSelectedDate = (event) => {
    console.log(event);
    const newDate = new Date(event.$d).toLocaleDateString('pt-br', { year: "numeric", month: "numeric", day: "numeric" });
    console.log('oiiiiiiiiii', newDate);

    setSelectedDateToViewReservation(String(newDate));
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const goToReservationPage = () => {
    router.push('/reserva')
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 4, minWidth: 500, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
          <IconButton onClick={handleClick}>
            <CalendarIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar onChange={(event) => { handleSelectedDate(event) }} />
            </LocalizationProvider>
          </Popover>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
            <Typography color={'black'} marginRight={'40px'} variant='subtitle2'>{String(selectedDateViewer)}</Typography>
            <Button onClick={() => goToReservationPage()} aria-label="Login" color="success">Adicionar Reserva</Button>
          </Box>

        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 4, minWidth: 500, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
          {reservations?.length > 0 ? (
            reservations?.map((reservationInfo, index) => {
              return <ReservationCard key={index} reservationInfo={reservationInfo} />
            })
          ) : (
            <Typography color={'black'} fontSize={'16px'} variant='h5'>Não há reservas para este dia 🕖</Typography>
          )}
        </Box>
      </Box >
    </>
  )
}
