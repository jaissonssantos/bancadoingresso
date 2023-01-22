import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import dayjs from 'dayjs';
import Locale from 'dayjs/locale/pt-br';
import { Provider } from 'react-redux';
import { AuthProvider } from './contexts/AuthContext/AuthProvider';
import { SnackProvider } from './hooks/useSnackbar';
import { BottomSheetProvider } from './contexts/BottomSheetContext/BottomSheetProvider';
import { RootStack } from './navigation/RootStack';
import { store } from './redux/store';
import { theme } from './styleguide/theme';

dayjs.locale(Locale);

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreLogs(['EventEmitter.removeListener']);

export const App: React.FC = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <SnackProvider>
        <AuthProvider>
          <BottomSheetProvider>
            <NavigationContainer theme={theme}>
              <RootStack />
            </NavigationContainer>
          </BottomSheetProvider>
        </AuthProvider>
      </SnackProvider>
    </SafeAreaProvider>
  </Provider>
);
