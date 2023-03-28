import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import JText from '../../customComponents/JText';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JScreen from '../../customComponents/JScreen';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JShadowView from '../../customComponents/JShadowView';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useContext} from 'react';
import {StoreContext} from '../../mobx/store';
import {useState} from 'react';
import JSearchInput from '../../customComponents/JSearchInput';
import JRecentJobTile from '../../customComponents/JRecentJobTile';
import JScrollView from '../../customComponents/JScrollView';
import {useNavigation} from '@react-navigation/native';
import JButton from '../../customComponents/JButton';
import JRow from '../../customComponents/JRow';
const Job = () => {
  const navigation = useNavigation();
  const store = useContext(StoreContext);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <JScreen
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {'Jobs'}
            </JText>
          }
        />
      }>
      <JSearchInput
        length={1}
        onChangeText={e => {
          store.setAllFeatureCompanyInput(e);
        }}
        onPressIcon={() => alert('Icon Pressed')}
      />
      <JScrollView>
        {[0, 1, 2].map((item, index) => (
          <>
            <JRecentJobTile
              onSelect={() => setModalVisible(true)}
              onPress={() => navigation.navigate('JobDetails')}
              image={false}
              title={'Project Manager'}
              key={index}
            />
          </>
        ))}
      </JScrollView>
      <View
        style={{
          height: heightPercentageToDP(6),
          paddingTop: RFPercentage(0.3),
          backgroundColor: 'transparent',
        }}>
        <JButton
          style={{paddingHorizontal: RFPercentage(5)}}
          onPress={() => {
            navigation.navigate('AddNew_Job');
          }}
          children={'Add New Job'}
        />
      </View>
      
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <SafeAreaView style={styles.container}>
          <View style={styles.modal}>
            <JText style={styles.header}>Attention!</JText>
            <JText style={styles.msg}>Are you sure want to change the status?</JText>
            <JRow style={{justifyContent:'space-between',}}>
              <JButton onPress={()=> setModalVisible(false)} style={{backgroundColor:'#E5E5E5',width:'50%',borderWidth:RFPercentage(0)}} 
              children={'No'}/>
              <JButton style={{width:'50%'}}children={'Yes'}/>
             
            </JRow>
          </View>
        </SafeAreaView>
      </Modal>
    </JScreen>
  );
};

export default Job;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  modal: {
    height: RFPercentage(25),
    width: '80%',
    backgroundColor: '#ffff',
    alignItems:'center',
    padding:RFPercentage(2),
    justifyContent:'space-between',shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  },
  header:{fontSize:RFPercentage(2.3),fontWeight:'bold',textAlign:'center'},
  msg:{fontSize:RFPercentage(2),textAlign:'center'},
});
