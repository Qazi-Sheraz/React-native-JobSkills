import {
    StyleSheet,
    View,
    Pressable,
    ActivityIndicator,
    ScrollView,
    FlatList,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
  } from 'react-native';
  import React, { useEffect } from 'react';
  import JText from './JText';
  import { RFPercentage } from 'react-native-responsive-fontsize';
  import colors from '../config/colors';
  import RBSheet from 'react-native-raw-bottom-sheet';
  import { useRef } from 'react';
  import JGradientHeader from './JGradientHeader';
  import { heightPercentageToDP } from 'react-native-responsive-screen';
  import DatePicker from 'react-native-date-picker';
  import { useState } from 'react';
  import JRow from './JRow';
  import { useContext } from 'react';
  import { StoreContext } from '../mobx/store';
  import JShadowView from './JShadowView';
  import { memo } from 'react';
  import JChevronIcon from './JChevronIcon';
  import JIcon from './JIcon';
  
  function JSelectDate({
    containerStyle,
    heading,
    icon,
    maximumDate,
    minimumDate,
    maximumDate1,
    minimumDate1,
    headingWeight = '500',
    value,
    value1,
    forPassword = false,
    error,
    isMultiple = false,
    isRequired = false,
    rightIcon,
    header,
    isDate = false,
    setValue,
    setValue1,
    date1 = '',
    date = new Date(),
    Licon,
    disabled = false,
  }) {
    const store = useContext(StoreContext);
    const refRBSheet = useRef();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    // const [date, setDate] = useState(new Date());
    // const [date, setDate] = useState(new Date());
  
    const [loader, setLoader] = useState(true);
   
  
     useEffect(() => {
     
     }, [date1])
  
    return (
      <>
        <Pressable
          disabled={disabled}
          onPress={() => {
              setOpen(true);
            }
          }
          style={[{ flexDirection: 'column' }, containerStyle]}>
          <JRow
            style={{
              justifyContent: 'space-between',
            }}>
            {icon}
            <JRow>
              <JText fontWeight={headingWeight} fontSize={RFPercentage(2.5)} fontColor={disabled == true ? colors.inputBorder[0] : colors.black[0]}>
                {heading}
              </JText>
              {isRequired && (
                <JText
                  style={{ marginHorizontal: RFPercentage(0.5) }}
                  fontColor={colors.danger[0]}
                  fontWeight={headingWeight}
                  fontSize={RFPercentage(2.5)}>
                  *
                </JText>
              )}
            </JRow>
            {!disabled&&
            rightIcon}
          </JRow>
          <JRow
            style={{
              marginTop: RFPercentage(1),
              borderBottomWidth: RFPercentage(0.2),
              borderBottomColor: error ? colors.danger[0] : colors.inputBorder[0],
            }}>
  
            <View
              style={{
                paddingBottom: RFPercentage(0.5),
                fontSize: RFPercentage(2.5),
                width: forPassword ? '90%' : '100%',
                color: colors.black[0],
              }}>
              <JRow> 
                {Licon}
                <JText>{value}</JText></JRow>
  
            </View>
  
          </JRow>
        </Pressable>
  
        <DatePicker
          modal
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          mode={'date'}
          open={open}
          date={date}
  
          onConfirm={(date) => {
            setValue(date)
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <DatePicker
          modal
          minimumDate={minimumDate1}
          maximumDate={maximumDate1}
          mode={'date'}
          open={open1}
          date={date1}
  
          onConfirm={(date1) => {
            setValue1(date1)
            setOpen1(false);
          }}
          onCancel={() => {
            setOpen1(false);
          }}
        />
      </>
    );
  }
  export default memo(JSelectDate);
  const styles = StyleSheet.create({});
  