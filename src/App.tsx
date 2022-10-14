import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './contexts/AuthContext/AuthProvider';
import { BottomSheetProvider } from './contexts/BottomSheetContext/BottomSheetProvider';
import { RootStack } from './navigation/RootStack';
import { theme } from './styleguide/theme';

export const App: React.FC = () => (
  <SafeAreaProvider>
    <AuthProvider>
      <BottomSheetProvider>
        <NavigationContainer theme={theme}>
          <RootStack />
        </NavigationContainer>
      </BottomSheetProvider>
    </AuthProvider>
  </SafeAreaProvider>
);
