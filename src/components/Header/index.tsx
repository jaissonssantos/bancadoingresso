import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon, IconSizes } from 'src/assets/icons';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Text, TextSizes, TextWeights } from 'src/components/Text';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';

interface HeaderProps {
  title: string;
  onBack: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onBack }) => (
  <SafeAreaView edges={['top']} style={styles.container}>
    <PressableOpacity onPress={onBack} style={styles.backButton}>
      <ArrowLeftIcon fill={Colors.white} size={IconSizes.xxxxmedium} />
    </PressableOpacity>
    {!!title && (
      <Text size={TextSizes.xmedium} weight={TextWeights.medium}>
        {title}
      </Text>
    )}
  </SafeAreaView>
);
