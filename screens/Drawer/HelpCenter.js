import {StyleSheet, Pressable,SafeAreaView, View,Modal, ScrollView} from 'react-native';
import React,{ useState } from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import JChevronIcon from '../../customComponents/JChevronIcon';
import CTermsConditions from './HelpCenter/CTermsConditions';
import CPrivacyPolicy from './HelpCenter/CPrivacyPolicy';
import CAboutUS from './HelpCenter/CAboutUS';
import { useContext } from 'react';
import { StoreContext } from '../../mobx/store';
const HelpCenter = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mname, setName] = useState();
  const store = useContext(StoreContext);
  return (
    <JScreen
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {'Help Center'}
            </JText>
          }
          left={<JChevronIcon />}
        />
      }>
      <View
        style={{
          marginTop: RFPercentage(4),

          flex: 1,
        }}>
        <Pressable
          onPress={() => {
            setModalVisible(true), setName('Terms & Condtions');
          }}
          style={styles.view}>
          <JText style={{fontSize: RFPercentage(2.5)}}>Terms & Condtions</JText>
        </Pressable>
        <Pressable
          onPress={() => {
            setModalVisible(true), setName('Privacy Policy');
          }}
          style={styles.view}>
          <JText style={{fontSize: RFPercentage(2.5)}}>Privacy Policy</JText>
        </Pressable>
        <Pressable
          onPress={() => {
            setModalVisible(true), setName('About us');
          }}
          style={styles.view}>
          <JText style={{fontSize: RFPercentage(2.5)}}>About us</JText>
        </Pressable>
      </View>
      <Modal animationType="slide" visible={modalVisible}>
        <SafeAreaView style={styles.modalView}>
          <JGradientHeader
            center={
              <JText
                fontColor={colors.white[0]}
                fontWeight="bold"
                fontSize={RFPercentage(2.5)}>
                {mname}
              </JText>
            }
            left={<JChevronIcon onPress={() => setModalVisible(false)} />}
          />
          
          {mname === 'Terms & Condtions' ? (
            <CTermsConditions />
          ) : mname === 'Privacy Policy' ? (
            <CPrivacyPolicy />
          ) : (
            <CAboutUS />
          )}
        </SafeAreaView>
      </Modal>
    </JScreen>
  );
};

export default observer(HelpCenter);

const styles = StyleSheet.create({
  view: {
    // backgroundColor: colors.tileColor[0],
    marginVertical: RFPercentage(2),
    paddingHorizontal: RFPercentage(4),
    // paddingVertical: RFPercentage(0.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  container: {marginVertical: RFPercentage(2)},
  modalView: {
    backgroundColor: colors.white[0],
    // alignItems: 'flex-start',
    height: '100%',
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: RFPercentage(2),
    marginTop: RFPercentage(1),
  },
  headingText1: {
    fontWeight: '600',
    fontSize: RFPercentage(2),
    marginTop: RFPercentage(1),
  },
  pgText: {
    marginVertical: RFPercentage(1),
    fontSize: RFPercentage(1.9),
  },
  pgText1: {
    marginVertical: RFPercentage(1),
    fontSize: RFPercentage(1.7),
  },
});
