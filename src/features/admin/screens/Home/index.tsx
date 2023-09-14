import React from 'react';
import { useAuth } from 'src/contexts/AuthContext/useAuth';
import type { AdminStackScreenProps } from 'src/navigation/AdminStack';
import { AdminHomeUI } from './ui';

type AdminHomeScreenProps = AdminStackScreenProps<'AdminTabHome.Home'>;

export const AdminHomeScreen: React.FC<AdminHomeScreenProps> = () => {
  const { clearAuthState } = useAuth();

  const handleOnSignOut = (): void => clearAuthState();

  const handleOnCloseCashRegister = (): void => {};

  return (
    <AdminHomeUI
      onSignOut={handleOnSignOut}
      onCloseCashRegister={handleOnCloseCashRegister}
    />
  );
};
