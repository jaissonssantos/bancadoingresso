import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonType } from 'src/components/Button';
import { CardListItem } from 'src/components/CardListItem';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { styles } from './styles';

interface AdminHomeUIProps {
  onSignOut: () => void;
  onCloseCashRegister: () => void;
}

export const AdminHomeUI: React.FC<AdminHomeUIProps> = ({
  onSignOut,
  onCloseCashRegister,
}) => (
  <SafeAreaView style={styles.safeArea}>
    <Text size={TextSizes.large} align={TextAligns.left} style={styles.title}>
      Admin
    </Text>

    <Text
      size={TextSizes.medium}
      align={TextAligns.left}
      style={styles.spacingBottom}>
      Geral
    </Text>

    <CardListItem title="Fechar caixa" onPress={onCloseCashRegister} />
  </SafeAreaView>
);
