import React from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSizes, BdiLogoIcon } from 'src/assets/icons';
import { Text, TextAligns, TextSizes } from 'src/components/Text';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';

interface IntroLoadingUIProps {
  message: string;
}

export const IntroLoadingUI: React.FC<IntroLoadingUIProps> = ({ message }) => (
  <SafeAreaView style={styles.safeArea}>
    <BdiLogoIcon size={IconSizes.xmedium} />
    <ActivityIndicator
      size="small"
      color={Colors.white}
      style={styles.loading}
    />
    <Text size={TextSizes.small} align={TextAligns.center}>
      {message}
    </Text>
  </SafeAreaView>
);
