import React, { createContext, useContext, ReactNode, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface ReservationContextProvider {
    selectedDate: Date | null
    selectedTime: Date | null,
    selectedSeats: string,
    setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>,
    setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>,
    setSelectedSeats: React.Dispatch<React.SetStateAction<string | null>>
}

//Iniciado com null e unefined pois ao renderizar a página o nao tem dados no reservation
export const ReservationContext = createContext<ReservationContextProvider | null>(null);

export const ReservationContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
    const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
    const [selectedSeats, setSelectedSeats] = React.useState<number | null>(null);

    const contextValue = {
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        selectedSeats,
        setSelectedSeats
    };
    return (
        <ReservationContext.Provider value={contextValue}>
            {children}
        </ReservationContext.Provider>
    );
};

export const useReservationContext = () => {
    const context = useContext(ReservationContext);
    if (!context) {
        throw new Error('ReservationContext deve ser usado dentro de um ReservationContextProvider');
    }
    return context;
};