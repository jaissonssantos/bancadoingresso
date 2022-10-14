import React from 'react';
import { View } from 'react-native';
import { CloseIcon, IconSizes } from 'src/assets/icons';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Text, TextSizes, TextWeights } from 'src/components/Text';
import { Colors } from 'src/styleguide/colors';
import type { SelectItem } from '../..';
import { styles } from './styles';

interface SelectBottomSheetContentProps {
  title: string;
  items: SelectItem[];
  onClose: () => void;
  onChangeItem: (item: SelectItem) => void;
}

export const SelectBottomSheetContent: React.FC<
  SelectBottomSheetContentProps
> = ({ title, onClose }) => (
  <View style={styles.container}>
    <View style={styles.rowHeader}>
      <Text
        size={TextSizes.xmedium}
        weight={TextWeights.bold}
        style={styles.title}>
        {title}
      </Text>
      <PressableOpacity style={styles.closeButton} onPress={onClose}>
        <CloseIcon fill={Colors.primary} size={IconSizes.xsmall} />
      </PressableOpacity>
    </View>
  </View>
);
