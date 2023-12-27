import React, { createContext, useContext, ReactNode, SetStateAction } from 'react';

interface AdminContextProvider {
    selectedDateToViewReservation: string | null
    setSelectedDateToViewReservation: React.Dispatch<SetStateAction<string | null>>
    userLogged: boolean
    setUserLogged: React.Dispatch<SetStateAction<boolean>>
    authToken: string
    setAuthToken: React.Dispatch<SetStateAction<string>>
    onDeleteReservation: boolean
    setOnDeleteReservation: React.Dispatch<SetStateAction<boolean>>
    selectedDateViewer: boolean, setSelectedDateViewer: React.Dispatch<SetStateAction<string>>
}

export const AdminContext = createContext<AdminContextProvider | null>(null);

export const AdminContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedDateToViewReservation, setSelectedDateToViewReservation] = React.useState<Date | null>(null);
    const [userLogged, setUserLogged] = React.useState<boolean>(false);
    const [onDeleteReservation, setOnDeleteReservation] = React.useState<boolean>(false);
    const [selectedDateViewer, setSelectedDateViewer] = React.useState<string>('');
    const [authToken, setAuthToken] = React.useState<string>('');

    const contextValue = {
        selectedDateToViewReservation,
        setSelectedDateToViewReservation,
        userLogged,
        setUserLogged,
        authToken,
        setAuthToken,
        onDeleteReservation, 
        setOnDeleteReservation,
        selectedDateViewer,
        setSelectedDateViewer
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