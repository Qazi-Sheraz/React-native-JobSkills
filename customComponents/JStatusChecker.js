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
          // status === 0
          //   ? colors.secondary[0]
          //   : status === 1
          //   ? colors.primary[0]
          //   : status === 2
          //   ? colors.danger[0]
          //   : status === 3
          //   ? colors.info[0]
          //   : status === 4
          //   ? colors.success[0]
          //   : status === 5
          //   ?colors.warning[0]
          //   : status === 6
          //   ?colors.success[0]
          //   : status === 7
          //   ?colors.info[0]
          //   : status === 8
          //   ?colors.primary[0]
          //   :colors.success[0],
          status === (0,store.lang.drafted)
            ? colors.secondary[0]
            : status === (1,store.lang.applied)
            ? colors.primary[0]
            : status === (2,store.lang.rejected)
            ? colors.danger[0]
            : status === (3,store.lang.selected)
            ? colors.info[0]
            : status === (4,store.lang.shortlisted)
            ? colors.success[0]
            : status === (5,store.lang.invitation_Sent)
            ?colors.warning[0]
            : status === (6,store.lang.interview_scheduled)
            ?colors.success[0]
            : status === (7,store.lang.interview_accepted)
            ?colors.info[0]
            : status === (8,store.lang.interview_rescheduled)
            ?colors.primary[0]
            :colors.success[0],
            
        color: colors.white[0],
        textAlign: 'center',
      }}>
      {status == 0
                  ? store.lang.drafted
                  : status == 1
                  ? store.lang.applied
                  : status == 2
                  ? store.lang.rejected
                  : status == 3
                  ? store.lang.selected
                  : status == 4
                  ? store.lang.shortlisted
                  : status == 5
                  ? store.lang.invitation_Sent
                  : status == 6
                  ? store.lang.interview_scheduled
                  : status == 7
                  ? store.lang.interview_accepted
                  : status == 8
                  ? store.lang.interview_rescheduled
                  :status == 9
                  ? store.lang.interview_completed:status}
    </JText>
  );
}

const styles = StyleSheet.create({});
