import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  ScrollViewProps,
} from 'react-native';
import { isIOS } from 'src/util/platform';
import { styles } from './styles';

const KeyboardAwareScrollView: React.FC<ScrollViewProps> = ({
  children,
  contentContainerStyle,
  ...rest
}) => {
  const content = (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.scrollViewContent, contentContainerStyle]}
      {...rest}>
      {children}
    </ScrollView>
  );

  if (isIOS) {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardAwareView}>
        {content}
      </KeyboardAvoidingView>
    );
  }

  return content;
};

export { KeyboardAwareScrollView };
