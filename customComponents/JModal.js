import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import JText from './JText';
import JButton from './JButton';
import JRow from './JRow';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useContext} from 'react';
import {StoreContext} from '../mobx/store';
import DeleteWarning from '../assets/svg/DeleteWarning.svg';

const JModal = ({
  msg,
  alertMsg,
  modalVisible,
  loader,
  onPressYes,
  onPressNo,
  disabled=false,
  name2,
  name1,
  btn = true,
  btn2 = true,
  modalStyle,
  icon,
  HW = 6,
  WW = 6,
}) => {
  const store = useContext(StoreContext);
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <SafeAreaView style={styles.container}>
        <View style={[styles.modal, modalStyle]}>
          {icon && (
            <DeleteWarning height={RFPercentage(HW)} width={RFPercentage(WW)} />
          )}
          <JText style={styles.header}>{alertMsg}</JText>
          <JText style={styles.menutxt}>{msg}</JText>
          <JRow style={{justifyContent: 'space-between'}}>
            {btn2 && (
              <JButton
              disabled={disabled}
                onPress={onPressNo}
                style={{
                  backgroundColor: '#E5E5E5',
                  width: '50%',
                  borderWidth: RFPercentage(0),
                }}
                children={name2 ? name2 : store.lang.no}
              />
            )}
            {btn && (
              <JButton
              disabled={disabled}
                onPress={onPressYes}
                style={{width: '50%'}}
                children={
                  loader ? (
                    <ActivityIndicator />
                  ) : name1 ? (
                    name1
                  ) : (
                    store.lang.yes
                  )
                }
              />
            )}
          </JRow>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default JModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000090',
  },
  modal: {
    // height: RFPercentage(25),
    width: '80%',
    backgroundColor: '#ffff',
    alignItems: 'center',
    padding: RFPercentage(2),
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  menutxt: {
    textAlign: 'center',
    fontSize: RFPercentage(2),
    marginVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(1),
  },
  header: {
    textAlign: 'center',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    paddingHorizontal: RFPercentage(1),
    marginVertical: RFPercentage(1),
  },
});
