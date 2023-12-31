import { StyleSheet, View, Image } from 'react-native'
import React, { useContext, useEffect } from 'react';
import JGradientScreen from '../../../customComponents/JGradientScreen'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import colors from '../../../config/colors'
import JText from '../../../customComponents/JText'
import { RFPercentage } from 'react-native-responsive-fontsize'
import JButton from '../../../customComponents/JButton'
import { StoreContext } from '../../../mobx/store';
import { useNavigation } from '@react-navigation/core';
import { observer } from 'mobx-react';
import JRow from '../../../customComponents/JRow';
import JChevronIcon from './../../../customComponents/JChevronIcon'
import AsyncStorage from '@react-native-async-storage/async-storage';
const BoundingScreenStart = () => {
    const store = useContext(StoreContext);
    const { navigate } = useNavigation()
    const handleSave = async () => {
        // Switch to the selected language
        try {
            await AsyncStorage.setItem('splash', 'true');
            store.setLangType('true');
            store.setAuthType('true');

            setTimeout(() => {
                store.setIsRefreshing(!store.isRefreshing);
                // console.log(store.isRefreshing);
                // setStat(!stat)
            }, 2000);

            // console.log(lang)
        } catch (error) {
            // console.log('Error storing language:', error);
        }
    };
    useEffect(() => {

    }, [store.isRefreshing])
    return (
        <JGradientScreen style={{ paddingHorizontal: RFPercentage(2), }}>

            <View style={styles.logo}>
                <JRow style={{ width: '100%', marginTop: RFPercentage(-7), }}><JChevronIcon /></JRow>
                <Image
                    source={require('../../../assets/images/logo/logo.png')}
                    style={{
                        height: heightPercentageToDP(25),
                        width: widthPercentageToDP(25),
                        tintColor: colors.white[0],
                        resizeMode: 'contain',
                    }}
                />
                <JText style={styles.headers}>{store.lang.JobSkills_The_Right_Employee_in_The_Right_Position}</JText>
                <JText style={styles.text}>{store.lang.we_are_launching_soon_This_project_is_owned_byFajer_Technology}</JText>
                <JText style={styles.text1}>{store.lang.Looking_for_job_or_to_hire_great_candidates_efficiently}</JText>
            </View>
            <JButton style={{ marginVertical: RFPercentage(2), }}
                onPress={() => { handleSave() }}>{store.lang.Get_Started}</JButton>

        </JGradientScreen>
    )
}

export default observer(BoundingScreenStart)

const styles = StyleSheet.create({
    logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headers: {
        width: '70%',
        color: colors.white[0],
        fontSize: RFPercentage(3),
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: RFPercentage(1),
    },
    text: {
        width: '70%',
        color: colors.white[0],
        fontSize: RFPercentage(2.5),
        textAlign: 'center',
    },
    text1: {
        // width:'80%',
        color: colors.white[0],
        fontSize: RFPercentage(2),
        textAlign: 'center',
        marginVertical: RFPercentage(3),
    }
})