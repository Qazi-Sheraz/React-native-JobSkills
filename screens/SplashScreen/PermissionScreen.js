import React, { useContext, useState, useEffect } from 'react'
import {
    View,
    Platform,
    StyleSheet,
    PermissionsAndroid,
} from 'react-native'
import colors from '../../config/colors';
import { StoreContext } from '../../mobx/store';
import JText from '../../customComponents/JText';
import DeviceInfo from 'react-native-device-info';
import Storage from '../../assets/svg/Storage.svg';
import JButton from '../../customComponents/JButton';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import Notification from '../../assets/svg/Notification.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JGradientScreen from '../../customComponents/JGradientScreen';
const PermissionScreen = () => {
    const store = useContext(StoreContext);
    const navigation = useNavigation();
    const [storage, setStorage] = useState(false)
    const [notification, setNotification] = useState(false)
    const [loader, setLoader] = useState(false)

    const checkApplicationPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                );
            } catch (error) {
                console.log('errorrrrrr======', error)
                setLoader(false)
            }
        }
    };

    const requestNotificationPermission = async () => {

        try {
            const authStatus = await messaging().requestPermission();
            if (
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL
            ) {
                console.log('Notification permission granted.');
                setNotification(true)
                setLoader(false)
            } else {
                console.log('Notification permission denied.');
                setNotification(true)
                setLoader(false)
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            setLoader(false)
        }
    };

    const requestStoragePermission = async () => {
        setLoader(true)
        try {
            const storagePermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            );

            if (storagePermission === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Storage permission granted.');
                handleSave();

            } else {
                console.log('Storage permission denied.');
                handleSave();
                // setLoader(false)
            }
        } catch (error) {
            console.error('Error requesting storage permission:', error);
            setLoader(false)
        }
    };

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();

        if (
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL
        ) {
            const token = await messaging().getToken();
            console.log('FCM Token -> ', token);
            var formdata = new FormData();
            formdata.append("token", token);
            formdata.append("name", store.deviceName);
            formdata.append("os", Platform.OS)
            formdata.append("version", Platform.Version);
            var requestOptions = {
                method: 'POST',
                body: formdata,
            };

            fetch("https://dev.jobskills.digital/api/device-token", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setLoader(false)
                })
                .catch(error => {
                    console.log('Token Added Api Error', error)
                    setLoader(false)
                });

        }
    }
    const fetchDeviceName = async () => {
        try {
            const name = await DeviceInfo.getDeviceName();
            store.setDeviceName(name);
        } catch (error) {
            console.log('Error fetching device name:', error);
        }
    };


    const handleSave = async () => {
        // Switch to the selected language
        try {
            await AsyncStorage.setItem('permission', 'true');
            requestUserPermission();
            navigation.replace('BoundingScreenStart')
            setLoader(false)

        } catch (error) {
            // console.log('Error:', error);
            setLoader(false)
        }
    };
    useEffect(() => {
        fetchDeviceName();
    }, []);

    return (
        <JGradientScreen style={styles.main}>
            {!notification ?
                <View style={styles.innerView}>
                    <Notification height={RFPercentage(20)} width={RFPercentage(20)} marginBottom={RFPercentage(10)} />
                    <JText style={styles.txtHeader}>Enable push Notifications</JText>
                    <JText style={styles.txt}>Enable push notifications to receive updates from JobSkills</JText>
                </View>
                :
                <View style={styles.innerView}>
                    <Storage height={RFPercentage(20)} width={RFPercentage(20)} marginBottom={RFPercentage(10)} />
                    <JText style={styles.txtHeader}>Storage Access</JText>
                    <JText style={styles.txt}>We need access to your storage so you can upload resumes and set profile pictures</JText>
                </View>
            }

            <JButton
                style={styles.btn}
                disabled={loader ? true : false}
                onPress={() => {
                    if (!notification) {
                        checkApplicationPermission();
                        requestNotificationPermission();
                    } else {
                        requestStoragePermission();
                    }
                }}>
                {loader ? store.lang.loading : 'Allow'}
            </JButton>
        </JGradientScreen>
    )
}

export default PermissionScreen

const styles = StyleSheet.create({
    main: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.purple[0], paddingVertical: RFPercentage(10), },
    innerView: { alignItems: 'center', marginTop: RFPercentage(-10), },
    btn: {
        position: 'absolute',
        bottom: RFPercentage(4),
        paddingHorizontal: RFPercentage(4),
    },
    txtHeader: {
        fontSize: RFPercentage(2.5),
        color: colors.white[0],
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: RFPercentage(2)

    },
    txt: {
        width: RFPercentage(40),
        fontSize: RFPercentage(2),
        color: colors.white[0],
        textAlign: 'center'

    }
})