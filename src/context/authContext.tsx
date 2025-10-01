import React, {
  useState, useEffect, useMemo,
} from 'react';
import { axiosInstance } from '../utils/apis';
import type { AppContextProps, UserData } from './types';
import userDataContext from './contextData';
import Spinner from './spinner';

const AuthContext: React.FC<AppContextProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userChange, setUserChange] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('auth/');
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getUserData();
  }, [userChange]);

  const contextValue = useMemo(() => ({
    userData, setUserData, userChange, setUserChange,
  }), [userData, setUserData, userChange, setUserChange]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <userDataContext.Provider
      value={contextValue}
    >
      {children}
    </userDataContext.Provider>
  );
};

export default AuthContext;
