import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import JText from '../../customComponents/JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JGradientHeader from '../../customComponents/JGradientHeader';
import colors from '../../config/colors';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import JScreen from '../../customComponents/JScreen';
import JRow from '../../customComponents/JRow';
import {useState} from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';
import {StoreContext} from '../../mobx/store';
import {_getProfile} from '../../functions/Candidate/MyProfile';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {observer} from 'mobx-react';
const ProfileScreen = ({navigation}) => {
  const store = useContext(StoreContext);

  useEffect(() => {
    _getProfile(store);
  }, []);
  return (
    <JScreen
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {'My Profile'}
            </JText>
          }
          right={
            store.myProfileApiLoader && (
              <ActivityIndicator
                color={colors.white[0]}
                size={RFPercentage(2.5)}
              />
            )
          }
        />
      }>
      <FlatList
        style={{
          paddingHorizontal: RFPercentage(2),
          marginTop: RFPercentage(2),
        }}
        data={
          store.myProfileApiLoader
            ? []
            : [
                {
                  name: 'About Me',
                  route: 'Aboutme',
                  icon: (
                    <AntDesign
                      size={RFPercentage(3)}
                      style={styles.icon}
                      color={colors.black[0]}
                      name="user"
                    />
                  ),
                },
                {
                  name: 'Resume',
                  route: 'Resume',
                  icon: (
                    <Entypo
                      size={RFPercentage(3)}
                      style={styles.icon}
                      color={colors.black[0]}
                      name="text-document"
                    />
                  ),
                },

                {
                  name: 'Career Information',
                  route: 'CareerInformation',
                  icon: (
                    <AntDesign
                      size={RFPercentage(3)}
                      style={styles.icon}
                      color={colors.black[0]}
                      name="flag"
                    />
                  ),
                },
                {
                  name: 'Assessment',
                  route: 'Assessment',
                  icon: (
                    <MaterialCommunityIcons
                      size={RFPercentage(3)}
                      style={styles.icon}
                      color={colors.black[0]}
                      name="clipboard-edit-outline"
                    />
                  ),
                },
              ]
        }
        renderItem={({item, index}) => (
          <Pressable onPress={() => navigation.navigate(item.route)}>
            <JRow
              style={{
                marginBottom: RFPercentage(1),

                paddingVertical: RFPercentage(2),
                paddingHorizontal: RFPercentage(1),
              }}>
              {item.icon}
              <JText fontSize={RFPercentage(2)}>{item.name}</JText>
            </JRow>
          </Pressable>
        )}
        keyExtractor={(item, index) => index}
      />
    </JScreen>
  );
};

export default observer(ProfileScreen);

const styles = StyleSheet.create({
  icon: {marginRight: RFPercentage(2)},
});
