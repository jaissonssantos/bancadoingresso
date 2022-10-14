import React, { useState } from 'react';
import { useAuth } from 'src/contexts/AuthContext/useAuth';
import type { MainTabScreenProps } from 'src/navigation/MainTabNavigator';
import { DailyGoalBoxStates } from '../../components/DailyGoalBox';
import { HomeUI } from './ui';

type HomeScreenProps = MainTabScreenProps<'MainTab.Home'>;

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [dailyGoal, setDailyGoal] = useState(0);
  const [dailyGoalState, setDailyGoalState] = useState(
    DailyGoalBoxStates.default,
  );

  const { updateAuthState } = useAuth();

  const handleOnSaveDailyGoal = (newDailyGoal: number): void => {
    setDailyGoalState(DailyGoalBoxStates.loading);

    setTimeout(() => {
      setDailyGoalState(DailyGoalBoxStates.default);
      setDailyGoal(newDailyGoal);
    }, 3000);
  };

  const handleOnChangeDailyGoalState = (newState: DailyGoalBoxStates): void =>
    setDailyGoalState(newState);

  const handleOnMyStorePress = (): void => {
    updateAuthState({ accessToken: '' });
  };

  return <HomeUI />;
};
