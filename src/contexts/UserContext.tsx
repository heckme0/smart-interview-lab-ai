
import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  userStats: {
    interviewsCompleted: number;
    quizzesCompleted: number;
    averageScore: number;
    skillLevel: string;
  };
  updateStats: (newStats: Partial<any>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userStats, setUserStats] = useState({
    interviewsCompleted: 5,
    quizzesCompleted: 12,
    averageScore: 78,
    skillLevel: 'Intermediate'
  });

  const updateStats = (newStats: Partial<any>) => {
    setUserStats(prev => ({ ...prev, ...newStats }));
  };

  return (
    <UserContext.Provider value={{ userStats, updateStats }}>
      {children}
    </UserContext.Provider>
  );
};
