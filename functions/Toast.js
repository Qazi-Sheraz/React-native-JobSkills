import Toast from 'react-native-toast-message';
export const JToast = ({
  type = 'success',
  text1,
  text2,
  visibilityTime = 1500,
}) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    visibilityTime: visibilityTime,
  });
};
