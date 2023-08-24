import {StatusBar, StyleSheet, View} from 'react-native';
import React, { useContext } from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JButton from '../../customComponents/JButton';
import JDivider from '../../customComponents/JDivider';
import * as Animatable from 'react-native-animatable';
import { StoreContext } from '../../mobx/store';
import { observer } from 'mobx-react';

const SelectionSheet = ({navigation}) => {

  const store = useContext(StoreContext);
  return (
    <Animatable.View style={styles.sheetContainer} animation="slideInUp">
     
      <View style={styles.sheetItemContainer}>

        <JButton
          fontStyle={styles.buttonStyle}
          // onPress={() => store.setLang('ar')}
          onPress={() => navigation.navigate('CLogin', {type: 2})}
          >
          {store.lang.employer}
        </JButton>
        <JDivider
          containerStyle={{marginVertical: RFPercentage(2)}}
          children={store.lang.or}
        />
        <JButton
          fontStyle={styles.buttonStyle}
          onPress={() => navigation.navigate('CLogin', {type: 1})}
          borderColor={colors.black[0]}
          backgroundColor={colors.white[0]}>
          {store.lang.candidate}
        </JButton>
      </View>
    </Animatable.View>
  );
}
export default observer(SelectionSheet)
const styles = StyleSheet.create({
  buttonStyle: {
    fontWeight: '500',
  },

  sheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  sheetItemContainer: {
    backgroundColor: colors.white[0],
    height: heightPercentageToDP(30),
    width: '100%',
    borderTopEndRadius: RFPercentage(2),
    borderTopStartRadius: RFPercentage(2),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: RFPercentage(2),
  },
});
// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { observer } from 'mobx-react';

// const SelectionSheet = () => {
//   return (
//     <View>
//       <Text>SelectionSheet</Text>
//     </View>
//   )
// }

// export default SelectionSheet

// const styles = StyleSheet.create({})