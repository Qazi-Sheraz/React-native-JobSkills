import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JRow from './JRow';
import JIcon from './JIcon';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';
import JText from './JText';
import {useState} from 'react';

const JStatusbar = () => {
  const [selected, setSelected] = useState(index);
  const [index, setIndex] = useState(0);
  return (
    <>
      <JRow
        style={{
          marginVertical: RFPercentage(2),
          justifyContent: 'center',
          paddingHorizontal: RFPercentage(2),
        }}>
        <JIcon
       
          style={{
            marginRight: RFPercentage(-0.8),
          }}
          icon="io"
          name={index === 0 ? 'checkmark-circle-outline' : 'checkmark-circle'}
          color={colors.purple[0]}
          size={30}
        />

        <View
          style={[
            styles.line,
            {backgroundColor: index === 0  ?'transparent' :colors.purple[0]},
          ]}
        />

        <JIcon
          
          style={{
            marginRight: RFPercentage(-0.8),
            marginLeft: RFPercentage(-0.5),
          }}
          icon="io"
          name={index ===  2 && 3 ?'checkmark-circle-outline': 'checkmark-circle' }
          color={colors.purple[0]}
          size={30}
        />

        <View
          style={[
            styles.line,
            {
              backgroundColor:
               
                  index ===  2 || 3 ||4   ? colors.purple[0]
                  :  'transparent',
            },
          ]}
        />
        <JIcon
          
          style={{
            marginRight: RFPercentage(-0.8),
            marginLeft: RFPercentage(-0.5),
          }}
          icon="io"
          name={index === 0  && 3 ?'checkmark-circle-outline': 'checkmark-circle' }
          color={colors.purple[0]}
          size={30}
        />
        <View
          style={[
            styles.line,
            {
              backgroundColor:
                index === 3 || 4
                  ? colors.purple[0]
                  :  'transparent',
            },
          ]}
        />
        <JIcon
         
          style={{
            marginRight: RFPercentage(-0.8),
            marginLeft: RFPercentage(-0.5),
          }}
          icon="io"
          name={index === 3 ? 'checkmark-circle' : 'checkmark-circle-outline'}
          color={colors.purple[0]}
          size={30}
        />
        <View
          style={[
            styles.line,
            {
              backgroundColor:
                index === 1 && 2 && 3 && 4
                  ? colors.purple[0] :'transparent',
            },
          ]}
        />
        <JIcon
          
          style={{marginLeft: RFPercentage(-0.5)}}
          icon="ma"
          name={index === 4 ? 'star-circle' : 'star-circle-outline'}
          color={colors.purple[0]}
          size={30}
        />
      </JRow>
    </>
  );
};

export default JStatusbar;

const styles = StyleSheet.create({
  line: {
    borderTopWidth: RFPercentage(0.1),
    borderBottomWidth: RFPercentage(0.1),
    borderColor: colors.purple[0],
    width: RFPercentage(7),
    height: RFPercentage(1.5),
  },
});
// star-circle
// star-circle-outline

// checkmark-circle
// checkmark-circle-sharp
// checkmark-circle-outline
