import React from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSizes, BdiLogoIcon } from 'src/assets/icons';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';

interface IntroLoadingUIProps {}

export const IntroLoadingUI: React.FC<IntroLoadingUIProps> = () => (
  <SafeAreaView style={styles.safeArea}>
    <BdiLogoIcon size={IconSizes.xmedium} />
    <ActivityIndicator
      size="small"
      color={Colors.white}
      style={styles.loading}
    />
  </SafeAreaView>
);
