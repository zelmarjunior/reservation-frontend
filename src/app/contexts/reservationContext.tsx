import React, { createContext, useContext, ReactNode, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';

export type TRecommendations = {
    time: string,
    total_seats: string
}

interface ReservationContextProvider {
    selectedDate: Date | null
    selectedTime: Date | null,
    selectedSeats: string,
    showRecommendations: boolean,
    recommendationLists: TRecommendations[]
    recommendationLessBusy: TRecommendations[]
    recommendationNearest: TRecommendations[]
    setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>,
    setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>,
    setSelectedSeats: React.Dispatch<React.SetStateAction<string | null>>,
    setShowRecommendations: React.Dispatch<React.SetStateAction<boolean>>,
    setRecommendationLists: React.Dispatch<React.SetStateAction<TRecommendations[]>>,
    setRecommendationLessBusy: React.Dispatch<React.SetStateAction<TRecommendations[]>>,
    setRecommendationNearest: React.Dispatch<React.SetStateAction<TRecommendations[]>>,
}

//Iniciado com null e unefined pois ao renderizar a página o nao tem dados no reservation
export const ReservationContext = createContext<ReservationContextProvider | null>(null);

export const ReservationContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
    const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
    const [selectedSeats, setSelectedSeats] = React.useState<number | null>(1);
    const [showRecommendations, setShowRecommendations] = React.useState(false);
    const [recommendationLists, setRecommendationLists] = React.useState<TRecommendations[]>([]);
    const [recommendationLessBusy, setRecommendationLessBusy] = React.useState<TRecommendations[]>([]);
    const [recommendationNearest, setRecommendationNearest] = React.useState<TRecommendations[]>([]);

    const contextValue = {
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        selectedSeats,
        setSelectedSeats,
        showRecommendations,
        setShowRecommendations,
        recommendationLists,
        setRecommendationLists,
        recommendationLessBusy,
        setRecommendationLessBusy,
        recommendationNearest,
        setRecommendationNearest
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