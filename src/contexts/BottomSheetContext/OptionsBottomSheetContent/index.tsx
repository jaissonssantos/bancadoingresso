import React from 'react';
import { Button, ButtonProps } from 'src/components/Button';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { styles } from './styles';

interface OptionsBottomSheetContent {
  title?: string;
  actions: ButtonProps[];
}

export const OptionsBottomSheetContent: React.FC<OptionsBottomSheetContent> = ({
  title,
  actions,
}) => (
  <>
    <Text
      style={styles.title}
      size={TextSizes.medium}
      align={TextAligns.center}
      weight={TextWeights.bold}>
      {title || 'Escolha uma opção'}
    </Text>
    {actions.map(({ style, title: buttonTitle, ...rest }) => (
      <Button
        key={buttonTitle}
        title={buttonTitle}
        style={[styles.button, style]}
        {...rest}
      />
    ))}
  </>
);
