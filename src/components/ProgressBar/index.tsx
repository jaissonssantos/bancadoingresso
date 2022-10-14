import React from 'react';
import { View, ViewProps } from 'react-native';
import { styles } from './styles';

interface ProgressBarProps extends Pick<ViewProps, 'style'> {
  activeValue?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  activeValue = 0,
  style,
}) => (
  <View style={[styles.bar, style]}>
    <View style={[styles.activeBar, { width: `${activeValue * 100}%` }]} />
  </View>
);
