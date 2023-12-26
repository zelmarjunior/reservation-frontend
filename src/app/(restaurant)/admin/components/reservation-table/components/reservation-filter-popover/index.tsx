import * as React from 'react';
import Popover from '@mui/material/Popover';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import { useAdminContext } from '@/app/contexts/adminContext';

export default function ReservationFilterPopover(props) {

    const { setSelectedDateToViewReservation } = useAdminContext();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleselectedDate = (event) => {
        console.log('cliquei no calendariozinho', event.$d);
        //const newData = { id: 15, name: 'Zelmar', phone: 54996650287, qtdSeats: 2, date: '12-12-2023', time: '11:00' }
        const newData = '2023-12-26';
        setSelectedDateToViewReservation(newData);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <IconButton onClick={handleClick}>
                <FilterListIcon />
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
                    <DateCalendar onChange={(event) => { handleselectedDate(event) }} />
                </LocalizationProvider>
            </Popover>
        </div>
    );
}