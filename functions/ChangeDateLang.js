// import moment from 'moment';
// import 'moment/locale/ar';
// import { useContext } from 'react';
// import { StoreContext } from '../mobx/store';
// export const convertTimeToLanguage = date => {
//   const store = useContext(StoreContext);
//   // console.log(date);
//   const type = date.type;
//   const momentTime = moment(date.date);
//   const momentTime4 = moment(date.date, 'DD-MM-YYYY');
//   const localizedMoment =
//     type == 4 || 6 ? momentTime4.clone() : momentTime.clone();

//   // Check if the selected language is Arabic
//   if (date.selectedLang === 'ar') {
//     // Use an Arabic locale for moment
//     localizedMoment.locale('ar');

//     // Convert the time to Arabic words
//     return moment
//   } else {
//     // Use the default locale for moment (English)
//     localizedMoment.locale('en');

//     // Convert the time to English words
//     return moment
//   }
// };
// // import moment from 'moment';
// // import 'moment/locale/ar';
// // export const convertTimeToLanguage = date => {
// //   console.log(date);
// //   const type = date.type;
// //   const momentTime = moment(date.date);
// //   const momentTime4 = moment(date.date, 'DD-MM-YYYY');
// //   const localizedMoment =
// //     type == 4 || 6 ? momentTime4.clone() : momentTime.clone();

// //   // Check if the selected language is Arabic
// //   if (date.selectedLang === 'ar') {
// //     // Use an Arabic locale for moment
// //     localizedMoment.locale('ar');

// //     // Convert the time to Arabic words
// //     return type == 0
// //       ? localizedMoment.fromNow()
// //       : type == 1
// //       ? localizedMoment.format('HH:mm A')
// //       : type == 2
// //       ? localizedMoment.format('ddd DD')
// //       : type == 3
// //       ? localizedMoment.format('MMM YYYY')
// //       : type == 4 || type == 5
// //       ? localizedMoment.format('DD-MM-YYYY')
// //       : type == 6
// //       ? localizedMoment.format('DD MMM,YYYY')
// //        : '';
// //   } else {
// //     // Use the default locale for moment (English)
// //     localizedMoment.locale('en');

// //     // Convert the time to English words
// //     return type == 0
// //       ? localizedMoment.fromNow()
// //       : type == 1
// //       ? localizedMoment.format('HH:mm A')
// //       : type == 2
// //       ? localizedMoment.format('ddd DD')
// //       : type == 3
// //       ? localizedMoment.format('MMM YYYY')
// //       : type == 4 || type == 5
// //       ? localizedMoment.format('DD-MM-YYYY')
// //       : type == 6
// //       ? localizedMoment.format('DD MMM,YYYY')
// //       : '';
// //   }
// // };
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ChangeDateLang = () => {
  return (
    <View>
      <Text>ChangeDateLang</Text>
    </View>
  )
}

export default ChangeDateLang

const styles = StyleSheet.create({})