import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JText from '../../customComponents/JText';
import JScreen from '../../customComponents/JScreen';
import JChevronIcon from '../../customComponents/JChevronIcon';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JButton from '../../customComponents/JButton';
import {useState} from 'react';
import JCircleCheck from '../../customComponents/JCircleCheck';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { StoreContext } from '../../mobx/store';

const ChangeLanguage = () => {
  const navigation=useNavigation();
  const store = useContext(StoreContext);
  const [data, setData] = useState([
    {id: 0, lang: 'English (United Kingdom)', selected: false},
    {id: 1, lang: 'اردو', selected: false},
    {id: 2, lang:  'العربية', selected: false},
  ]);
  const handleSave = () => {
    const selectedLanguage = data.find(item => item.selected);
    if (selectedLanguage) {
      store.setLang(selectedLanguage.lang);
    }
    // navigation.goBack();
    console.log(selectedLanguage)
  };
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
          left={JChevronIcon}
        />
      }>
      <View style={{flex: 1, marginVertical: RFPercentage(3)}}>
        <JText style={styles.header}>Jobskills Language :</JText>
        {data.map((item, index) => (
          <JCircleCheck
          key={index}
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
        ))}
      </View>

      <JButton
      // onPress={()=> handleSave()}
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
