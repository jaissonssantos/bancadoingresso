import React, { useEffect, useRef } from 'react';
import { Animated, Easing, TouchableOpacity, View } from 'react-native';
import { Text, TextSizes } from 'src/components/Text';
import { NoteIcon, IconSizes } from 'src/assets/icons';
import { Colors } from 'src/styleguide/colors';
import styles from './styles';

export type SnackbarType = 'default' | 'success' | 'danger' | 'info';

export interface SnackbarProps {
  visible: boolean;
  message: string;
  type: SnackbarType;
  onClose?: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
  visible,
  message,
  type = 'default',
  onClose,
}: SnackbarProps) => {
  const translateYRef = useRef(new Animated.Value(-100));

  useEffect(() => {
    if (visible) {
      Animated.timing(translateYRef.current, {
        duration: 300,
        easing: Easing.ease,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateYRef.current, {
        duration: 450,
        easing: Easing.ease,
        toValue: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const finalContainerStyle = [
    styles.container,
    type === 'default' ? styles.containerDefault : null,
    type === 'success' ? styles.containerSuccess : null,
    type === 'danger' ? styles.containerDanger : null,
    type === 'info' ? styles.containerInfo : null,
  ];

  return (
    <Animated.View
      style={[
        styles.snackbar,
        { transform: [{ translateY: translateYRef.current }] },
      ]}>
      <TouchableOpacity onPress={onClose} style={finalContainerStyle}>
        <Text size={TextSizes.small} style={styles.text}>
          {message}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Snackbar;
