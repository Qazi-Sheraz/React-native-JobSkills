import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import JScreen from '../../customComponents/JScreen';

import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
function Notification({navigation}) {
  const store = useContext(StoreContext);
  return <JScreen></JScreen>;
}

export default observer(Notification);
const styles = StyleSheet.create({});
