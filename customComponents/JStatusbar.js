import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React ,{useEffect,useContext,useState}from 'react';
import JRow from './JRow';
import JIcon from './JIcon';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';
import JText from './JText';
import { StoreContext } from '../mobx/store';
import { useRoute } from '@react-navigation/native';
import url from '../config/url';
import { observer } from 'mobx-react';


const JStatusbar = ({item}) => {
  const [index, setIndex] = useState(item);
  const [loader, setLoader] = useState(true);
  const {params}= useRoute()
  const store = useContext(StoreContext);
  console.log('statusssss========>',item)
 
  // useEffect(() => {
  // _getStatusbar();
  // }, [loader])

  return (
    // loader?<ActivityIndicator/>:
    // (
    <>
    
      <JRow
        style={{

          // marginVertical: RFPercentage(2),
          justifyContent: 'center',
          // backgroundColor:'red',
          // marginHorizontal: RFPercentage(2),
        }}>
        <JIcon
          style={{
            marginRight: 0,
          }}
          icon={index === 2 ?'fa':'io'}
          name={index === 2 ?'circle':index === 0 ?  'checkmark-circle-outline':'checkmark-circle'}
          color={index>0 && index!==2  ? colors.purple[0] : index === 2 ? colors.danger[0]:  'transparent'}
          size={30}
        />

        <View
          style={[
            styles.line,
            {backgroundColor: index >2 ? colors.purple[0] : index === 2 ? colors.danger[0]: 'transparent' ,
            borderColor:index === 2 ?colors.danger[0]:colors.purple[0]
           },
          ]}
        />

        <JIcon
          
          style={{
            marginHorizental: RFPercentage(-1),
            // marginLeft: RFPercentage(-0.8),
          }}
          icon={index === 2 ?'fa':'io'}
          name={index === 2 ?'circle':index >  1 ?  'checkmark-circle':'checkmark-circle-outline' }
          color={index === 2 ? colors.danger[0]:colors.purple[0]}
          size={30}
        />

        <View
          style={[
            styles.line,
            {
              backgroundColor:
               
                  index > 4 || index === 3   ? colors.purple[0]
                  : index === 2 ? colors.danger[0]
                  :  'transparent',
                  borderColor:index === 2 ?colors.danger[0]:colors.purple[0]
            },
          ]}
        />
        <JIcon
          
          style={{
            marginHorizental: RFPercentage(-1),
            // marginLeft: RFPercentage(-0.8),
          }}
          icon={index === 2 ?'fa':'io'}
          name={index === 2 ?'circle':index > 5 || index ===3  ? 'checkmark-circle':'checkmark-circle-outline' }
          color={index === 2 ? colors.danger[0]:colors.purple[0]}
          size={30}
        />
        <View
          style={[
            styles.line,
            {
              backgroundColor:
                index > 6 || index === 3 
                  ? colors.purple[0]
                  : index === 2 ? colors.danger[0]
                  :  'transparent',
                  borderColor:index === 2 ?colors.danger[0]:colors.purple[0],
            },
          ]}
        />
        <JIcon
         
          style={{
            marginHorizental: RFPercentage(-0.5),
            // marginLeft: RFPercentage(-0.8),
          }}
          icon={index === 2 ?'fa':'io'}
          name={index === 2 ?'circle':index === 3 || index >  8 ? 'checkmark-circle' : 'checkmark-circle-outline'}
          color={index === 2 ? colors.danger[0]:colors.purple[0]}
          size={30}
        />
        <View
          style={[
            styles.line,
            {
              backgroundColor:
                index === 3
                  ? colors.purple[0] : index === 2 ? colors.danger[0]:'transparent',
                  borderColor:index === 2 ?colors.danger[0]:colors.purple[0]
            },
          ]}
        />
        <JIcon
          
          style={{marginHorizental: RFPercentage(-0.5)}}
          icon={index === 2 ?'an':'ma'}
          name={index === 2 ?'closecircle':index === 3  ? 'star-circle' : 'star-circle-outline'}
          color={index === 2 ? colors.danger[0]:colors.purple[0]}
          size={index === 2 ?25:30}
        />
      </JRow>
     
     <JRow style={{justifyContent:'space-evenly',width:'70%',}}>
     { index===2?
      <JText style={styles.text1}>{store.lang.rejected}</JText>
     :index===1?
      <JText style={styles.text1}>{store.lang.applied}</JText>
      
     :index===3?
      <JText style={styles.text1}>{store.lang.selected}</JText>
      :<>
      <JText style={styles.text}>{store.lang.shortlisteds}</JText>
      <JText style={styles.text}>{store.lang.Interview}{'\n'}{store.lang.scheduled}</JText>
      <JText style={styles.text}>{store.lang.Interview}{'\n'}{store.lang.completed}</JText>
     </>}
      </JRow>
    </>
  );
};

export default observer(JStatusbar);

const styles = StyleSheet.create({
  line: {
    borderTopWidth: RFPercentage(0.1),
    borderBottomWidth: RFPercentage(0.1),
    // width: RFPercentage(8),
    paddingHorizontal:RFPercentage(4),
    height: RFPercentage(1.5),
    marginRight: RFPercentage(-0.5),
    marginLeft: RFPercentage(-0.7),
    
  },
  text:{textAlign:'center',},
  text1:{textAlign:'center',fontWeight:'bold',marginTop: RFPercentage(1),color:colors.purple[0],fontSize:RFPercentage(2)}
});
