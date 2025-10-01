import React from 'react';

interface UserData {
    fullName?: string,
    role: string,
    id: string,
    profileImg?: string,
    username?: string
    therapistId?:number

}
interface AppContextProps {
    children: React.ReactNode;
}

interface UserDataContextValue {
    userData: UserData | null;
    setUserData: React.Dispatch<React.SetStateAction<UserData|null>>;
    userChange: boolean;
    setUserChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { AppContextProps, UserDataContextValue, UserData };
