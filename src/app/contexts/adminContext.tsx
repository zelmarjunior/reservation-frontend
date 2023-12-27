import React, { createContext, useContext, ReactNode, SetStateAction } from 'react';

interface AdminContextProvider {
    selectedDateToViewReservation: Date | null
    setSelectedDateToViewReservation: React.Dispatch<SetStateAction<string | null>>
    userLogged: boolean
    setUserLogged: React.Dispatch<SetStateAction<boolean>>
}

export const AdminContext = createContext<AdminContextProvider | null>(null);

export const AdminContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedDateToViewReservation, setSelectedDateToViewReservation] = React.useState<string | null>(null);
    const [userLogged, setUserLogged] = React.useState<boolean>(false);

    const contextValue = {
        selectedDateToViewReservation,
        setSelectedDateToViewReservation,
        userLogged,
        setUserLogged
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