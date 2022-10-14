import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'src/components/Text';

interface ScheduleHomeUIProps {}

export const ScheduleHomeUI: React.FC<ScheduleHomeUIProps> = () => (
  <SafeAreaView>
    <Text>ScheduleHome</Text>
  </SafeAreaView>
);
