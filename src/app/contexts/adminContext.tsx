import React, { createContext, useContext, ReactNode, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface AdminContextProvider {
    selectedDateToViewReservation: Date | null
    setSelectedDateToViewReservation: React.Dispatch<SetStateAction<string | null>>
}

export const AdminContext = createContext<AdminContextProvider | null>(null);

export const AdminContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedDateToViewReservation, setSelectedDateToViewReservation] = React.useState<string | null>(null);
    const contextValue = {
        selectedDateToViewReservation,
        setSelectedDateToViewReservation,
    };
    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('AdminContext deve ser usado dentro de um AdminContextProvider');
    }
    return context;
};