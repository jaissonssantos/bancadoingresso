import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import dayjs from 'dayjs';
import Locale from 'dayjs/locale/pt-br';
import { Provider } from 'react-redux';
import { AuthProvider } from './contexts/AuthContext/AuthProvider';
import { BottomSheetProvider } from './contexts/BottomSheetContext/BottomSheetProvider';
import { RootStack } from './navigation/RootStack';
import { store } from './redux/store';
import { theme } from './styleguide/theme';

dayjs.locale(Locale);

export const App: React.FC = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <AuthProvider>
        <BottomSheetProvider>
          <NavigationContainer theme={theme}>
            <RootStack />
          </NavigationContainer>
        </BottomSheetProvider>
      </AuthProvider>
    </SafeAreaProvider>
  </Provider>
);
