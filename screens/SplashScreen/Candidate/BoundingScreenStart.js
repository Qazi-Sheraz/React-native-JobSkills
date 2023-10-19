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
                <JText style={styles.headers}>{`JobSkills \n The Right Employee in The Right Position`}</JText>
                <JText style={styles.text}>{`we are launching soon...! \n This project is owned by \nFajer Technology`}</JText>
                <JText style={styles.text1}>{`Looking for job or to hire great candidates efficiently? JobSkills Solutions gives access to most advanced features! Respond to candidates as soon as they apply for jobs or respond to letters. Easily contact the right people for open roles. Conduct assessments, contact, recruit, and prepare candidates on the go.`}</JText>
            </View>
            <JButton style={{ marginVertical: RFPercentage(2), }}
                onPress={() => { handleSave() }}>Get Started</JButton>

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