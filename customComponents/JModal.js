// import { Modal, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context';
// import JText from './JText';
// import JButton from './JButton';
// import JRow from './JRow';

// const JModal = () => {
//   return (
//     <Modal animationType="fade" transparent={true} visible={modalVisible}>
//     <SafeAreaView style={styles.container}>
//       <View style={styles.modal}>
//         <JText style={styles.header}>{store.lang.attention}</JText>
//         <JText style={styles.msg}>
//           {store.lang.areYouSure}
//         </JText>
//         <JRow style={{justifyContent: 'space-between'}}>
//           <JButton
//             onPress={() => setModalVisible(false)}
//             style={{
//               backgroundColor: '#E5E5E5',
//               width: '50%',
//               borderWidth: RFPercentage(0),
//             }}
//             children={store.lang.no}
//           />
//           <JButton
//             onPress={onPress}
//             style={{width: '50%'}}
//             children={store.lang.yes}
//           />
//         </JRow>
//       </View>
//     </SafeAreaView>
//   </Modal>
//   )
// }

// export default JModal

// const styles = StyleSheet.create({})