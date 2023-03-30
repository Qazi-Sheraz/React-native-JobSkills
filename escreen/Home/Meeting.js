import {FlatList, StyleSheet, Text, View} from 'react-native';
import React,{useRef} from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientProfileHeader from '../../customComponents/JGradientProfileHeader';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import JText from '../../customComponents/JText';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JMeetingJob from '../../customComponents/JMeetingJob';
import RBSheet from 'react-native-raw-bottom-sheet';

const Meeting = () => {
  const data=[
{HeadingName:'Project Manager',
name2:"Taqi Haider"},
{HeadingName:'UI Designer',
name2:"Altama"},
{HeadingName:'Manager',
name2:"Taqi Haider"},
{HeadingName:'Graphics Designer',
name2:"Hisham "},
  ]
  const refRBSheet = useRef();
  return (
    <JScreen
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {'Meetings'}
            </JText>
          }
        />
        
      }><View  style={{
        marginVertical: RFPercentage(5),
      }} >
        <FlatList 
        data={data}
        renderItem={({item})=> 
        <JMeetingJob 
        onPress={()=> refRBSheet.current.open()}
        HeadingName={item.HeadingName} name2={item.name2}/>
        } />
       </View> 
        <RBSheet
        ref={refRBSheet}
        // closeOnDragDown={true}
        closeOnPressMask={true}
        height={heightPercentageToDP(23)}

        customStyles={{
          container:{borderTopLeftRadius:RFPercentage(2.5),borderTopRightRadius:RFPercentage(2.5)},
          wrapper: {
            backgroundColor: '#00000080',
          },
          draggableIcon: {
            backgroundColor: colors.black[0],
            display: 'none',
          },
        }}><View style={{paddingLeft:RFPercentage(3),paddingTop:RFPercentage(1)}}>
          <JText style={{
            marginVertical: RFPercentage(1),
            fontSize:RFPercentage(2.5),
            fontWeight:'bold'}}>Meeting Info</JText>
          <JText style={styles.rbtxt}>Meeting ID</JText>
          <JText style={styles.rbtxt2}>3457654</JText>
          <JText style={styles.rbtxt}>Password</JText>
          <JText style={styles.rbtxt2}>34fgg654</JText>
          </View></RBSheet>
      </JScreen>
  );
};

export default Meeting;

const styles = StyleSheet.create({
  rbtxt:{
    marginVertical: RFPercentage(0.5),
    fontSize:RFPercentage(2),
  fontWeight:'bold'},
  rbtxt2:{
    marginVertical: RFPercentage(0.5),
    fontSize:RFPercentage(2)},
});
