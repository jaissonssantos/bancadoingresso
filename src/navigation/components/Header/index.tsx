import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon, IconSizes } from 'src/assets/icons';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Text, TextSizes, TextWeights } from 'src/components/Text';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';

export const Header: React.FC<NativeStackHeaderProps> = ({
  back,
  navigation,
  options: { title },
}) => {
  if (!back) {
    return null;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <PressableOpacity onPress={navigation.goBack} style={styles.backButton}>
        <ArrowLeftIcon fill={Colors.black} size={IconSizes.xxxxmedium} />
      </PressableOpacity>
      {!!title && (
        <Text size={TextSizes.xmedium} weight={TextWeights.medium}>
          {title}
        </Text>
      )}
    </SafeAreaView>
  );
};
