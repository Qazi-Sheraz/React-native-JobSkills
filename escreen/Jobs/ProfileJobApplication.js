import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JScreen from '../../customComponents/JScreen';
import JHeader from '../../customComponents/JHeader';
import JGradientHeader from '../../customComponents/JGradientHeader';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';
import {useNavigation} from '@react-navigation/native';
import JIcon from '../../customComponents/JIcon';
import JRow from '../../customComponents/JRow';
import JAssessmentResult from '../../customComponents/JAssessmentResult';
import JButton from '../../customComponents/JButton';
import JStatusbar from '../../customComponents/JStatusbar';
import JSkills from '../../customComponents/JSkills';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useRef} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const ProfileJobApplication = () => {
  const data = [
    {name: 'Personal Assessment'},
    {name: 'Cognitive Assessment'},
    {name: 'Professional Assessment'},
    {name: 'Cultural Assessment'},
    {name: 'Cognitive Assessment'},
  ];

  const refRBSheet = useRef();
  const navigation = useNavigation();
  return (
    <View style={styles.maincontainer}>
      <JHeader
        left={
          <Feather
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={RFPercentage(3.5)}
            color={colors.black[0]}
          />
        }
        right={<JIcon icon={'sm'} name={'options-vertical'} size={20} />}
      />
      <View style={styles.main}>
        <Image
          style={styles.img}
          source={require('../../assets/images/Taqi.png')}
        />
        <JText style={styles.headertxt}>Taqi Haider</JText>
        <JText style={styles.titleJob}>Laravel Developer</JText>
        <JText style={styles.txt}>Taqi.haider@bftech.io</JText>
        <JText style={styles.txt}>Ar-Riyad, Ar-Riyad, Saudi Arabia</JText>
        <JRow
          style={{
            width: '60%',
            justifyContent: 'space-between',
            marginVertical: RFPercentage(1),
          }}>
          <JText style={styles.txt}>+923161424024</JText>
          <JText style={styles.txt}>Dec 25, 2021</JText>
        </JRow>

        <JStatusbar />

        <ScrollView style={{width: '100%'}}>
          <View
            style={{
              // width: '100%',
              backgroundColor: '#ffff',
              paddingHorizontal: RFPercentage(3),
              paddingVertical: RFPercentage(2),
              marginBottom: RFPercentage(1),
            }}>
            <JText style={styles.result}>Assessment Result</JText>
            <JAssessmentResult
              title={'Personal Assessment'}
              percent="75%"
              color={colors.purple[0]}
            />
            <JAssessmentResult
              title={'Cognitive Assessment'}
              percent="45%"
              color={colors.purple[0]}
            />
            <JAssessmentResult
              title={'Professional Assessment'}
              percent="65%"
              color={colors.purple[0]}
            />
            <JButton
              style={{marginTop: RFPercentage(0.5)}}
              onPress={() => refRBSheet.current.open()}
              children={'See more'}
            />
          </View>
          <JSkills
            title={'Experience'}
            JobTitle={'Ui Ux Designer'}
            date={'Oct 2021- Present'}
            txt={'Alshamel ,Saudia Arabia'}
            txt2={'Lorem Ipsum is simply dummy '}
          />

          <JSkills
            title={'Education'}
            JobTitle={'BS (CS)'}
            date={'2016- 20'}
            txt={'Dar Al Uloom University ,Saudia Arabia'}
            txt2={'Lorem Ipsum is simply dummy  '}
          />

          <JSkills
            JobTitle={'BS (CS)'}
            date={'2016- 20'}
            txt={'Dar Al Uloom University ,Saudia Arabia'}
            txt2={'Lorem Ipsum is simply dummy  '}
          />
          <View
            style={{
              width: '100%',
              backgroundColor: '#ffff',
              paddingHorizontal: RFPercentage(3),
              paddingVertical: RFPercentage(2),
              marginBottom: RFPercentage(1),
            }}>
            <JText style={styles.result}>Skills</JText>
            <JAssessmentResult
              title={'Personal Assessment'}
              percent="75%"
              color={'#B7834A'}
            />
            <JAssessmentResult
              title={'Cognitive Assessment'}
              percent="45%"
              color={'#B7834A'}
            />
            <JAssessmentResult
              title={'Professional Assessment'}
              percent="65%"
              color={'#B7834A'}
            />
            <JButton
              style={{marginTop: RFPercentage(0.5)}}
              onPress={() => refRBSheet.current.open()}
              children={'See more'}
            />
          </View>
          <RBSheet
            ref={refRBSheet}
            // closeOnDragDown={false}
            closeOnPressMask={true}
            height={heightPercentageToDP(32)}
            customStyles={{
              container: {
                borderTopLeftRadius: RFPercentage(2.5),
                borderTopRightRadius: RFPercentage(2.5),
              },
              wrapper: {
                backgroundColor: '#00000080',
              },
              draggableIcon: {
                backgroundColor: colors.black[0],
                display: 'none',
              },
            }}>
            <View style={styles.RBView}>
              <JText style={styles.RBHeader}>Assessment Result</JText>

              {data.map((item, index) => (
                <JAssessmentResult
                  key={index}
                  title={item.name}
                  percent="75%"
                  color={colors.purple[0]}
                />
              ))}
            </View>
          </RBSheet>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileJobApplication;

const styles = StyleSheet.create({
  maincontainer: {flex: 1, backgroundColor: colors.tileColor[0]},
  main: {
    height: '90%',
    width: '100%',
    alignItems: 'center',
  },
  img: {
    height: RFPercentage(13),
    width: RFPercentage(13),
    borderRadius: RFPercentage(6.5),
    marginTop: RFPercentage(-5),
  },
  headertxt: {
    fontSize: RFPercentage(3.5),
    fontWeight: 'bold',
    color: colors.purple[0],
    marginVertical: RFPercentage(0.5),
  },
  titleJob: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    marginVertical: RFPercentage(0.5),
  },
  txt: {marginVertical: RFPercentage(0.5)},
  result: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginVertical: RFPercentage(1),
  },
  RBView: {paddingHorizontal: RFPercentage(2.5), paddingTop: RFPercentage(2)},
  RBHeader: {
    fontSize: RFPercentage(2.8),
    fontWeight: 'bold',
    marginVertical: RFPercentage(0.5),
  },
  RBtxt: {
    fontSize: RFPercentage(2.4),
    fontWeight: '600',
    marginVertical: RFPercentage(0.7),
    width: '100%',
  },
});
