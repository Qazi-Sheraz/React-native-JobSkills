import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
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
import {getDrawerItems} from '../data/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import pkg from '../package.json';
export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      {/* <DrawerItem label="Help" onPress={() => alert('Link to help')} /> */}
      <View
        style={{
          paddingVertical: RFPercentage(3),

          alignItems: 'center',
          borderBottomColor: colors.inputBorder[0],
          borderBottomWidth: RFPercentage(0.1),
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: RFPercentage(8),
              width: RFPercentage(8),

              borderRadius: RFPercentage(4),
              backgroundColor: colors.isValid[0],
            }}></View>
        </View>
        <View style={{width: '80%'}}>
          <JText style={styles.text} fontSize={RFPercentage(2.4)}>
            Mutahira Syed
          </JText>
          <JText style={styles.text}>mutahira.syed@bftech.io</JText>
          <JText style={styles.text}>Ui/Ux Designer</JText>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: RFPercentage(2),
          marginTop: RFPercentage(3),
        }}>
        {getDrawerItems().map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Profile');
              props.navigation.closeDrawer();
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: RFPercentage(1.7),
            }}
            key={index}>
            {index === 0 ? (
              <Ionicons name="settings-outline" size={RFPercentage(3.5)} />
            ) : index === 1 ? (
              <AntDesign name="user" size={RFPercentage(3.8)} />
            ) : index === 2 ? (
              <Ionicons name="ios-briefcase-outline" size={RFPercentage(3.5)} />
            ) : index === 3 ? (
              <MaterialCommunityIcons
                name="bell-ring-outline"
                size={RFPercentage(3.5)}
              />
            ) : index === 4 ? (
              <Feather name="users" size={RFPercentage(3.5)} />
            ) : index === 6 ? (
              <MaterialIcons name="logout" size={RFPercentage(3.5)} />
            ) : (
              <Feather name="help-circle" size={RFPercentage(3.5)} />
            )}
            <JText
              fontWeight="bold"
              fontSize={RFPercentage(2)}
              style={{marginLeft: RFPercentage(2)}}>
              {item}
            </JText>
          </TouchableOpacity>
        ))}
      </View>

      <JText
        fontWeight="bold"
        fontSize={RFPercentage(2)}
        fontColor={colors.placeHolderColor[0]}
        style={{
          marginLeft: RFPercentage(2),
          textAlign: 'center',
          marginTop: heightPercentageToDP(25),
        }}>
        Version: {pkg.version}
      </JText>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  text: {
    marginVertical: RFPercentage(0.3),
  },
});
