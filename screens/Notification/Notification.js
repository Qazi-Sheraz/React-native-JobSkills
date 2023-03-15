import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import JScreen from '../../customComponents/JScreen';

import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import JText from '../../customComponents/JText';
function Notification({navigation, route}) {
  const store = useContext(StoreContext);
  const params = route.params || {};
  const {id} = params;
  return (
    <JScreen>
      <JText>{id}</JText>
    </JScreen>
  );
}

export default observer(Notification);
const styles = StyleSheet.create({});
