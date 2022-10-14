import React from 'react';
import { Button, ButtonType } from 'src/components/Button';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';

export interface MessageBottomSheetContenProps {
  title: string;
  message: string;
  buttonTitle: string;
  onPressButton: () => void;
}

export const MessageBottomSheetContent: React.FC<
  MessageBottomSheetContenProps
> = ({ title, message, buttonTitle, onPressButton }) => (
  <>
    <Text
      size={TextSizes.xmedium}
      align={TextAligns.center}
      weight={TextWeights.bold}>
      {title}
    </Text>
    <Text
      size={TextSizes.small}
      align={TextAligns.center}
      color={Colors.lightText}
      weight={TextWeights.medium}
      style={styles.message}>
      {message}
    </Text>
    <Button
      title={buttonTitle}
      onPress={onPressButton}
      type={ButtonType.primary}
    />
  </>
);
