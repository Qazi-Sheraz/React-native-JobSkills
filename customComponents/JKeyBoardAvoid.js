import {
  KeyboardAvoidingView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import React from 'react';

export default function JKeyboardAvoid({children}) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
}
