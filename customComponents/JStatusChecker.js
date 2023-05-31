import {StyleSheet} from 'react-native';
import React from 'react';
import JText from './JText';
import colors from '../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import { StoreContext } from '../mobx/store';
import { useContext } from 'react';
export default function JStatusChecker({status,onPress}) {
  const store = useContext(StoreContext); 
  return (
    <JText
   
      style={{
        paddingHorizontal: RFPercentage(1.5),
        paddingVertical: RFPercentage(1),
        backgroundColor:
          status === store.lang.drafted
            ? colors.secondary[0]
            : status === store.lang.applied
            ? colors.primary[0]
            : status === store.lang.rejected
            ? colors.danger[0]
            : status === store.lang.selected
            ? colors.info[0]
            : status === store.lang.shortlisted
            ? colors.success[0]
            : status === store.lang.invitation_Sent
            ?colors.warning[0]
            : status === store.lang.interview_scheduled
            ?colors.success[0]
            : status === store.lang.interview_accepted
            ?colors.info[0]
            : status === store.lang.interview_rescheduled
            ?colors.primary[0]
            :colors.success[0],
            
        color: colors.white[0],
        textAlign: 'center',
      }}>
      {status}
    </JText>
  );
}

const styles = StyleSheet.create({});
