import React from 'react';
import { View, Modal, ViewStyle, TextStyle } from 'react-native';
import { Button } from 'src/components/Button';
import { Text, TextSizes } from 'src/components/Text';
import styles from './styles';

export interface ActionProps {
  title?: string;
  onPress(): void;
  borderRadius?: boolean;
  titleStyle?: TextStyle;
  buttonStyle?: ViewStyle;
}

export interface DialogProps {
  visible: boolean;
  title?: string;
  helperText?: string;
  onClose?: () => void;
  content: React.ReactElement;
  actions: ActionProps[];
}

export const Dialog: React.FC<DialogProps> = ({
  visible,
  title,
  helperText,
  onClose,
  content,
  actions,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      transparent>
      <View style={styles.modal}>
        <View style={styles.content}>
          {title && (
            <View style={styles.header}>
              <Text size={TextSizes.small}>{title}</Text>
              {helperText && (
                <View>
                  <Text size={TextSizes.xxsmall}>{helperText}</Text>
                </View>
              )}
            </View>
          )}
          <View style={styles.modalContent}>{content}</View>
          <View style={styles.modalFooterButton}>
            {actions.map(action => (
              <React.Fragment key={action.title}>
                <View style={styles.spacingBottom} />
                <Button
                  title={action.title ?? ''}
                  onPress={(): void => action.onPress()}
                  titleStyle={action.titleStyle}
                  style={action.buttonStyle}
                />
              </React.Fragment>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};
