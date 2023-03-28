import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JText from '../../customComponents/JText';
import JIcon from '../../customComponents/JIcon';
import JScreen from '../../customComponents/JScreen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JButton from '../../customComponents/JButton';
import {useState} from 'react';
import JCircleCheck from '../../customComponents/JCircleCheck';
import { useNavigation } from '@react-navigation/native';

const ChangeLanguage = () => {
  const navigation=useNavigation();
  const [data, setData] = useState([
    {id: 0, lang: 'English (United Kingdom)', selected: false},
    {id: 1, lang: 'اردو', selected: false},
    {id: 2, lang:  'العربية', selected: false},
  ]);
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
              Change Language
            </JText>
          }
          left={
            <JIcon
              icon="fe"
              onPress={() => navigation.goBack()}
              name="chevron-left"
              size={RFPercentage(3.5)}
              color={colors.white[0]}
            />
          }
        />
      }>
      <View style={{flex: 1, marginVertical: RFPercentage(3)}}>
        <JText style={styles.header}>Jobskills Language :</JText>
        {data.map((item, index) => (
          <JCircleCheck
            language={item.lang}
            isSelected={item.selected}
            onPress={() => {
              setData(
                data.map(obj =>
                  obj.id === item.id
                    ? {...obj, selected: true}
                    : {...obj, selected: false},
                ),
              );
            }}
          />

          //   <JLanguages
          //    language={item.lang}
          //   isSelected={item.selected}
          //   onPress={() => {
          //     setData(
          //       data.map(obj =>
          //         obj.id === item.id
          //           ? {...obj, selected: true}
          //           : {...obj, selected: false},
          //       ),
          //     );
          //   }} key={index} />
        ))}
      </View>

      <JButton
        style={{
          marginBottom: RFPercentage(5),
          paddingHorizontal: RFPercentage(5),
        }}
        children={'Save'}
      />
    </JScreen>
  );
};

export default ChangeLanguage;

const styles = StyleSheet.create({
  header: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    marginBottom: RFPercentage(2),
  },
});
