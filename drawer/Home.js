// import {FlatList, StyleSheet, Image, View, Pressable} from 'react-native';
// import React from 'react';
// import JScreen from '../../customComponents/JScreen';
// import JHeader from '../../customComponents/JHeader';
// import Feather from 'react-native-vector-icons/Feather';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {RFPercentage} from 'react-native-responsive-fontsize';
// import JLogoImage from '../../customComponents/JLogoImage';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import JShadowView from '../../customComponents/JShadowView';
// import translation from '../../config/translation';
// import {useContext} from 'react';
// import {StoreContext} from '../../mobx/store';
// import colors from '../../config/colors';
// import JText from '../../customComponents/JText';
// import JScrollView from '../../customComponents/JScrollView';
// import JGradientView from '../../customComponents/JGradientView';
// import JSideHeading from '../../customComponents/JSideHeading';
// import moment from 'moment';
// import JRecentJobTile from '../../customComponents/JRecentJobTile';
// const Home = ({navigation}) => {
//   const store = useContext(StoreContext);
//   return (
//     <JScreen
//       //   isError={store.homeApiError}
//       //   onTryAgainPress={() => _getHomeData(store)}
//       style={{paddingHorizontal: RFPercentage(2)}}
//       internet={true}
//       header={
//         <JHeader
//           left={
//             <Feather
//               color={colors.black[0]}
//               onPress={() => ResumeDrawer()}
//               name="menu"
//               size={RFPercentage(3.5)}
//             />
//           }
//           center={
//             <JLogoImage
//               height={heightPercentageToDP(5)}
//               width={widthPercentageToDP(15)}
//               tintColor={null}
//             />
//           }
//           right={
//             <MaterialCommunityIcons
//               onPress={() => navigation.navigate('CNotification')}
//               name="bell-badge-outline"
//               size={RFPercentage(3.5)}
//             />
//           }
//         />
//       }>
//       <React.Fragment>
//         <Pressable
//           onPress={() => navigation.navigate('CSearch')}
//           style={{
//             height: '7%',
//             borderColor: `${colors.searchIcon[0]}50`,
//             borderWidth: RFPercentage(0.1),
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             paddingHorizontal: RFPercentage(1),
//             alignItems: 'center',
//           }}>
//           <JText fontColor={colors.searchIcon[0]} fontSize={RFPercentage(2)}>
//             Job Tile
//           </JText>
//           <AntDesign
//             name="search1"
//             color={colors.searchIcon[0]}
//             size={RFPercentage(2.5)}
//           />
//         </Pressable>
//         <JScrollView>
//           <FlatList
//             style={{alignSelf: 'center', marginVertical: RFPercentage(2)}}
//             horizontal
//             data={[
//               {
//                 name: 'Total',
//                 count: 18,
//               },
//               {
//                 name: 'Open',
//                 count: 9,
//               },
//               {
//                 name: 'Close',
//                 count: 10,
//               },

//               {
//                 name: 'Paused',
//                 count: 27,
//               },
//             ]}
//             showsHorizontalScrollIndicator={false}
//             renderItem={({item, index}) => (
//               <View
//                 style={{
//                   marginHorizontal: RFPercentage(0.6),
//                 }}>
//                 <JGradientView
//                   containerStyle={{
//                     width: RFPercentage(12),
//                     height: RFPercentage(12),

//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginBottom: RFPercentage(1),
//                   }}>
//                   {index === 0 ? (
//                     <AntDesign
//                       size={RFPercentage(3)}
//                       name="videocamera"
//                       color={colors.white[0]}
//                     />
//                   ) : index === 1 ? (
//                     <Ionicons
//                       size={RFPercentage(3)}
//                       name="briefcase-outline"
//                       color={colors.white[0]}
//                     />
//                   ) : index === 2 ? (
//                     <AntDesign
//                       size={RFPercentage(3)}
//                       name="pausecircleo"
//                       color={colors.white[0]}
//                     />
//                   ) : (
//                     <AntDesign
//                       size={RFPercentage(3)}
//                       name="closecircleo"
//                       color={colors.white[0]}
//                     />
//                   )}

//                   <JText fontColor={colors.white[0]}>{item.count}</JText>
//                 </JGradientView>
//                 <JText
//                   fontSize={RFPercentage(2)}
//                   fontAlign="center"
//                   fontColor={colors.black[0]}>
//                   {`${item.name} \n Jobs`}
//                 </JText>
//               </View>
//             )}
//             keyExtractor={data => data.name}
//           />
//           <JText
//             fontSize={RFPercentage(2)}
//             fontWeight="bold"
//             fontColor={colors.black[0]}>
//             Upcoming Meetings
//           </JText>

//           <View
//             style={{
//               flexDirection: 'row',
//               marginTop: RFPercentage(1),
//               borderBottomWidth: RFPercentage(0.1),
//               borderBottomColor: colors.border[0],
//             }}>
//             <View
//               style={{
//                 backgroundColor: colors.purple[0],
//                 width: '25%',
//                 alignItems: 'center',
//                 paddingVertical: RFPercentage(3),
//                 borderTopEndRadius: RFPercentage(2),
//                 borderBottomEndRadius: RFPercentage(2),
//                 shadowColor: '#000000',
//                 shadowOpacity: 0.3,
//                 shadowRadius: 2,
//                 shadowOffset: {
//                   height: 1,
//                   width: 1,
//                 },
//                 elevation: 4,
//               }}>
//               <JText style={{color: colors.white[0]}}>
//                 {moment().format('HH:MM A')}
//               </JText>
//               <JText style={{color: colors.white[0]}}>
//                 {moment().format('ddd DD')}
//               </JText>
//               <JText style={{color: colors.white[0]}}>
//                 {moment().format('MMM YYYY')}
//               </JText>
//             </View>
//             <View style={{paddingLeft: RFPercentage(2), width: '75%'}}>
//               <JText fontWeight="bold" fontSize={RFPercentage(2.2)}>
//                 Project Manager
//               </JText>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginTop: RFPercentage(1),
//                 }}>
//                 <Image
//                   style={{
//                     width: RFPercentage(4),
//                     height: RFPercentage(4),
//                     borderRadius: RFPercentage(4),
//                   }}
//                   source={{
//                     uri: 'https://media.istockphoto.com/id/1358205700/photo/shot-of-a-young-man-using-his-smartphone-to-send-text-messages.jpg?s=1024x1024&w=is&k=20&c=KAY3jM0WHkdPdQEPwMl1B2gGKDb_hP_596yrU-5yuSs=',
//                   }}
//                 />
//                 <JText
//                   style={{
//                     marginLeft: RFPercentage(1),
//                     fontSize: RFPercentage(1.9),
//                   }}>
//                   Taqi Haider
//                 </JText>
//               </View>

//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',

//                   alignSelf: 'flex-end',
//                   borderWidth: RFPercentage(0.2),
//                   borderColor: colors.purple[0],
//                   paddingVertical: RFPercentage(0.5),
//                   paddingHorizontal: RFPercentage(0.8),
//                 }}>
//                 <JText
//                   style={{marginRight: RFPercentage(0.5)}}
//                   fontWeight="bold">
//                   Start
//                 </JText>
//                 <Entypo name="controller-play" size={RFPercentage(2)} />
//               </View>
//             </View>
//           </View>

//           <JText
//             style={{marginVertical: RFPercentage(1)}}
//             fontSize={RFPercentage(2)}
//             fontWeight="bold"
//             fontColor={colors.black[0]}>
//             Recent Jobs
//           </JText>

//           {[0, 1, 2, 3, 4, 5].map((item, index) => (
//             <JRecentJobTile title={'Project Manager'} key={index} />
//           ))}

//           <View></View>
//         </JScrollView>
//       </React.Fragment>
//     </JScreen>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({});
