import React, {useState, useRef, useContext} from 'react';
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
import {getDrawerItems} from '../data/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import pkg from '../package.json';
import {StoreContext} from '../mobx/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {observer, Observer} from 'mobx-react';
import JRow from '../customComponents/JRow';
import {JToast} from '../functions/Toast';
import JIcon from '../customComponents/JIcon';
import FlashMessage from 'react-native-flash-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

function CustomDrawerContent(props) {
  const store = useContext(StoreContext);
  const user = store.token?.user;
  const [loader, setLoader] = useState(false);
  // const linkedRef = useRef(null);
  const _navigateToScreen = index => {
    // props.navigation.closeDrawer()
    index == 0
      ? props.navigation.navigate('EAccountSetting')
      : index == 1
      ? props.navigation.navigate('CAllJobs')
      : index == 2
      ? props.navigation.navigate('DJobAlert')
      : index == 3
      ? props.navigation.navigate('DFollowings')
      : index == 4
      ? props.navigation.navigate('DHelpCenter')
      : AsyncStorage.removeItem('@login')
          .then(res => {
            setLoader(true);
            JToast({
              type: 'success',
              text1: store.lang.logout_successfully,
            });
            googleSignOut();
            store.setToken({});

            // console.log('object')
            setLoader(false);
          })
          .catch(error => {
            JToast({
              type: 'danger',
              text1: store.lang.eror,
              text2: 'Error while removing token',
            });
            setLoader(false);
          });
  };

  const _navigationIcons = index =>
    index == 0 ? (
      <Ionicons
        color={colors.black[0]}
        name="settings-outline"
        size={RFPercentage(3.5)}
      />
    ) : index == 1 ? (
      <Ionicons
        color={colors.black[0]}
        name="ios-briefcase-outline"
        size={RFPercentage(3.5)}
      />
    ) : index == 2 ? (
      <MaterialCommunityIcons
        color={colors.black[0]}
        name="bell-ring-outline"
        size={RFPercentage(3.5)}
      />
    ) : index == 3 ? (
      <Feather color={colors.black[0]} name="users" size={RFPercentage(3.5)} />
    ) : index == 4 ? (
      <Feather
        color={colors.black[0]}
        name="help-circle"
        size={RFPercentage(3.5)}
      />
    ) : index == 5 ? (
      <MaterialIcons
        color={colors.black[0]}
        name="logout"
        size={RFPercentage(3.5)}
      />
    ) : (
      <Feather
        color={colors.black[0]}
        name="help-circle"
        size={RFPercentage(3.5)}
      />
    );
  const _EnavigateToScreen = index => {
    // props.navigation.closeDrawer()
    index == 0
      ? props.navigation.navigate('EAccountSetting')
      : index == 1
      ? props.navigation.navigate('Followers')
      : index == 2
      ? props.navigation.navigate('Employes')
      : index == 3
      ? props.navigation.navigate('Assessments')
      : index == 4
      ? props.navigation.navigate('DHelpCenter')
      : index == 5
      ? AsyncStorage.removeItem('@login')
          .then(res => {
            setLoader(true);
            if (res !== null) {
              googleSignOut();
              JToast({
                type: 'success',
                text1: store.lang.logout_successfully,
              });
              store.setToken({});
              setLoader(false);
            }
          })
          .catch(error => {
            JToast({
              type: 'danger',
              text1: store.lang.eror,
              text2: 'Error while removing token',
            });
            setLoader(false);
          })
      : null;
  };

  const _EnavigationIcons = index =>
    index == 0 ? (
      <JIcon
        icon="io"
        color={colors.black[0]}
        name="settings-outline"
        size={RFPercentage(3.5)}
      />
    ) : index == 1 ? (
      <JIcon
        icon="fe"
        color={colors.black[0]}
        name="users"
        size={RFPercentage(3.5)}
      />
    ) : index == 2 ? (
      <JIcon
        icon="ma"
        color={colors.black[0]}
        name="bell-ring-outline"
        size={RFPercentage(3.5)}
      />
    ) : index == 3 ? (
      <JIcon
        icon="ft"
        color={colors.black[0]}
        name="bar-chart"
        size={RFPercentage(2.4)}
      />
    ) : index == 4 ? (
      <JIcon
        icon="fe"
        color={colors.black[0]}
        name="help-circle"
        size={RFPercentage(3.5)}
      />
    ) : index == 5 ? (
      <JIcon
        icon="mi"
        color={colors.black[0]}
        name="logout"
        size={RFPercentage(3.5)}
      />
    ) : (
      <JIcon
        icon="fe"
        color={colors.black[0]}
        name="help-circle"
        size={RFPercentage(3)}
      />
    );
  const googleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess(); // Revoke access to the app
      await GoogleSignin.signOut(); // Sign out from the Google account
      // Now, the user can sign in with a different Google account next time.
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  // const logoutFromLinkedIn = async () => {
  //   try {
  //     // Revoke the LinkedIn access token using the library's method
  //     // Note: The method to revoke the token may vary based on the library's API.
  //     // Replace 'revokeAccessToken' with the actual method if provided.
  //     await linkedRef.current.revokeAccessToken();
  //     await linkedRef.current.logoutAsync();

  //     // Clear local session data, e.g., user credentials
  //     // (You'll need to implement this part based on your app's structure)

  //     // Update the UI to reflect the user's logout
  //     // (Update your components or navigate to a logout screen)
  //   } catch (error) {
  //     // Handle any errors that may occur during the logout process
  //     console.error('LinkedIn logout error:', error);
  //   }
  // };
  return store.token?.user?.owner_type.includes('Candidate') ? (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
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
          {getDrawerItems().map((item, index) => (
            <JRow
              disabled={loader ? true : false}
              onPress={() => _navigateToScreen(index)}
              style={{
                marginVertical: RFPercentage(1.7),
              }}
              key={index}>
              {_navigationIcons(index)}
              <JText
                fontWeight="bold"
                fontSize={RFPercentage(2)}
                style={{marginHorizontal: RFPercentage(1)}}>
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
  ) : (
    <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
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
            {user?.full_name.length>25 ? `${user?.full_name.slice(0,25)}...`:user?.full_name}
          </JText>
          <JText style={styles.text}>{user?.email}</JText>
          {/* <JText style={styles.text}>Ui/Ux Designer</JText> */}
        </View>
        <View
          style={{
            paddingHorizontal: RFPercentage(2),
            marginTop: RFPercentage(3),
          }}>
          {getDrawerItems().map((item, index) => (
            <JRow
              disabled={loader ? true : false}
              onPress={() => _EnavigateToScreen(index)}
              style={{
                marginVertical: RFPercentage(1.7),
              }}
              key={index}>
              {_EnavigationIcons(index)}
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
export default observer(CustomDrawerContent);
const styles = StyleSheet.create({
  text: {
    marginVertical: RFPercentage(0.3),
    marginHorizontal: RFPercentage(1),
    // color: colors.black[1],
  },
});

// Candidate
{
  /* <DrawerItem

icon={() => <JIcon icon="io" color={colors.black[0]} name="settings-outline" size={RFPercentage(3)} />}
labelStyle={{ fontSize: RFPercentage(2.2), fontWeight: 'bold', color: 'black' }}
label={store.lang.account_settings}
onPress={() => props.navigation.navigate('EAccountSetting')} />

<DrawerItem
icon={() => <JIcon icon="io" color={colors.black[0]} name="ios-briefcase-outline" size={RFPercentage(3)} />}
labelStyle={{ fontSize: RFPercentage(2.2), fontWeight: 'bold', color: 'black' }}
label={store.lang.jobs}
onPress={() => props.navigation.navigate('CAllJobs')} />

<DrawerItem
icon={() => <JIcon icon="ma" color={colors.black[0]} name="bell-ring-outline" size={RFPercentage(3)} />}
labelStyle={{ fontSize: RFPercentage(2.2), fontWeight: 'bold', color: 'black', }}
label={store.lang.job_alert}
onPress={() => props.navigation.navigate('DJobAlert')} />
<DrawerItem
icon={() => <JIcon icon="fe" color={colors.black[0]} name="users" size={RFPercentage(3)} />}
labelStyle={{ fontSize: RFPercentage(2), fontWeight: 'bold', color: 'black' }}
label={store.lang.followings}
onPress={() => props.navigation.navigate('DFollowings')} />
<DrawerItem
icon={() => <JIcon icon="fe" color={colors.black[0]} name="help-circle" size={RFPercentage(3)} />}
labelStyle={{ fontSize: RFPercentage(2.2), fontWeight: 'bold', color: 'black' ,backgroundColor:'red'}}
label={store.lang.help_center}
onPress={() => props.navigation.navigate('DHelpCenter')} />
<DrawerItem
icon={() => <JIcon icon="mi" color={colors.black[0]} name="logout" size={RFPercentage(3)} />}
labelStyle={{ fontSize: RFPercentage(2.2), fontWeight: 'bold', color: 'black' }}
label={store.lang.logout}
onPress={() => {
  AsyncStorage.removeItem('@login')
    .then(res => {
      store.setToken({});
      JToast({
        type: 'success',
        text1: store.lang.logout_successfully,
      });
    })
    .catch(error => {
      JToast({
        type: 'error',
        text1: 'Error',
        text2: 'Error while removing token',
      });
    })
}} /> */
}

// Employe
{
  /* <DrawerItem
              icon={() => <JIcon icon="io" color={colors.black[0]} name="settings-outline" size={RFPercentage(3)} />}
              labelStyle={{ fontSize: RFPercentage(2.2), fontWeight: 'bold', color: 'black',backgroundColor:'red' }}
              label={`${store.lang.account_settings}`}
              onPress={() => props.navigation.navigate('EAccountSetting')} />

            <DrawerItem
              icon={() => <JIcon icon="fe" color={colors.black[0]} name="users" size={RFPercentage(3)} />}
              labelStyle={{ fontSize: RFPercentage(2.2), fontWeight: 'bold', color: 'black',backgroundColor:'red' }}
              label={`${store.lang.followers}`}
              onPress={() => props.navigation.navigate('Followers')} />

            <DrawerItem
              icon={() => <JIcon icon="ma" color={colors.black[0]} name="bell-ring-outline" size={RFPercentage(3)} />}
              labelStyle={{ fontSize: RFPercentage(2.2), fontWeight: 'bold', color: 'black', }}
              label={store.lang.employees}
              onPress={() => props.navigation.navigate('Employes')} />
            <DrawerItem
              icon={() => <JIcon icon="ft" color={colors.black[0]} name="bar-chart" size={RFPercentage(2.3)} />}
              labelStyle={{ fontSize: RFPercentage(2), fontWeight: 'bold', color: 'black' }}
              label={store.lang.assessments}
              onPress={() => props.navigation.navigate('Assessments')} />
            <DrawerItem
              icon={() => <JIcon icon="fe" color={colors.black[0]} name="help-circle" size={RFPercentage(3)} />}
              labelStyle={{ fontSize: RFPercentage(2.2), fontWeight: 'bold', color: 'black' }}
              label={store.lang.help_center}
              onPress={() => props.navigation.navigate('DHelpCenter')} />
            <DrawerItem
              icon={() => <JIcon icon="mi" color={colors.black[0]} name="logout" size={RFPercentage(3)} />}
              labelStyle={{ fontSize: RFPercentage(2.2), fontWeight: 'bold', color: 'black' }}
              label={store.lang.logout}
              onPress={() => {
                AsyncStorage.removeItem('@login')
                  .then(res => {
                    store.setToken({});
                    JToast({
                      type: 'success',
                      text1: store.lang.logout_successfully,
                    });
                  })
                  .catch(error => {
                    JToast({
                      type: 'error',
                      text1: 'Error',
                      text2: 'Error while removing token',
                    });
                  })
  }} /> */
}
