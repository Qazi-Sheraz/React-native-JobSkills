import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import JText from '../customComponents/JText';
import colors from '../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';

import pkg from '../package.json';
import {useContext} from 'react';
import {StoreContext} from '../mobx/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {observer, Observer} from 'mobx-react';
import { getDrawerItem } from '../data/edrawer';
import JIcon from '../customComponents/JIcon';
import { useNavigation } from '@react-navigation/native';
import JRow from '../customComponents/JRow';

function EDrawerContent (props) {
  
  const {navigate} = useNavigation();
  const store = useContext(StoreContext);
  const user = store.token?.user;
  const _navigateToScreen = index => {
    props.navigation.closeDrawer();
    index === 0
      ? navigate('EAccountSetting')
      : index === 1
      ? navigate('Followers')
      : index === 2
      ? navigate('Employes')
      : index === 3
      ? navigate('Assessments')
      : index === 4
      ? navigate('DHelpCenter')
      : index === 5
      ? AsyncStorage.removeItem('@login')
          .then(res => {
            store.setToken({
              token: null,
            });
            navigate('SelectionScreen');
            Toast.show({
              type: 'success',
              text1: 'Logout Successfully',
            });
          })
          .catch(error => {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Error while removing token',
            });
          })
      : null;
  };

  const _navigationIcons = index =>
    index === 0 ? (
      <JIcon
      icon='io'
        color={colors.black[0]}
        name="settings-outline"
        size={RFPercentage(3.5)}
      />
    ) : index === 1 ? (
        <JIcon
        icon='fe'
        color={colors.black[0]}
        name="users"
        size={RFPercentage(3.5)}
      />
    ) : index === 2 ? (
        <JIcon
        icon='ma'
        color={colors.black[0]}
        name="bell-ring-outline"
        size={RFPercentage(3.5)}
      />
    ) : index === 3 ? (
        <JIcon
        icon='ft' color={colors.black[0]} name="bar-chart" size={RFPercentage(2.4)} />
    ) : index === 4 ? (
        <JIcon
        icon='fe'
        color={colors.black[0]}
        name="help-circle"
        size={RFPercentage(3.5)}
      />
    ) : index === 5 ? (
        <JIcon
        icon='mi'
        color={colors.black[0]}
        name="logout"
        size={RFPercentage(3.5)}
      />
    ) : (
        <JIcon
        icon='fe'
        color={colors.black[0]}
        name="help-circle"
        size={RFPercentage(3)}
      />
    );
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      {/* <DrawerItem label="Help" onPress={() => alert('Link to help')} /> */}
      <View style={{height: heightPercentageToDP(100)}}>
        <View
          style={{
            paddingVertical: RFPercentage(2),

            alignItems: 'center',
            borderBottomColor: colors.inputBorder[0],
            borderBottomWidth: RFPercentage(0.1),
          }}>
          <View
            style={{
              height: RFPercentage(8),
              width: RFPercentage(8),
              backgroundColor: colors.black[0],
              borderRadius: RFPercentage(8),
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: RFPercentage(1),
            }}>
            <Image
              style={{
                height: RFPercentage(8),
                width: RFPercentage(8),
                borderRadius: RFPercentage(8),
              }}
              resizeMode="contain"
              source={{
                uri: user?.avatar,
              }}
            />
          </View>
          <JText style={styles.text} fontSize={RFPercentage(2.4)}>
            {user?.full_name}
          </JText>
          <JText style={styles.text}>{user?.email}</JText>
          {/* <JText style={styles.text}>Ui/Ux Designer</JText> */}
        </View>
        <View
          style={{
            paddingHorizontal: RFPercentage(2),
            marginTop: RFPercentage(3),
          }}>
          {getDrawerItem().map((item, index) => (
            <JRow
            disabled={false}
              onPress={() => _navigateToScreen(index)}
              style={{
                marginVertical: RFPercentage(1.7),
              }}
              key={index}>
              {_navigationIcons(index)}
              <JText
                fontWeight="bold"
                fontSize={RFPercentage(2)}
                style={{marginHorizontal: RFPercentage(2)}}>
                {item}
              </JText>
            </JRow>
          ))}
        </View>
      
        <JText
          fontWeight="bold"
          fontSize={RFPercentage(2)}
          fontColor={colors.placeHolderColor[0]}
          style={{
            textAlign: 'center',
            position: 'absolute',
            bottom: RFPercentage(5),
            alignSelf: 'center',
          }}>
          Version: {pkg.version}
        </JText>
      </View>
    </DrawerContentScrollView>
  );
}
export default observer(EDrawerContent);
const styles = StyleSheet.create({
  text: {
    marginVertical: RFPercentage(0.3),
    // color: colors.black[1],
  },
});
