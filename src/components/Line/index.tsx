import React from 'react';
import { View, ViewProps } from 'react-native';
import { styles } from './styles';

export const Line: React.FC<ViewProps> = ({ style, ...props }) => (
  <View style={[styles.line, style]} {...props} />
);
