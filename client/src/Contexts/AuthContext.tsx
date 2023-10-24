import React, { createContext, useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';


interface UserContextType {
  user: (email: string) => void;
  userData: any; 
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [userData, setUserData] = useState<any>(null);

  const user =async (email: string) => {
    axios.defaults.withCredentials = true;
    axios
      .post(
        'http://localhost:8080/userdetails',
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )
      .then((res: AxiosResponse) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      user(storedEmail)
    }
  }, [userData]);

  const contextValue: UserContextType = {
    user,
    userData,
  };
  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
