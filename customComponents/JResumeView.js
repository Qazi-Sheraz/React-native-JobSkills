import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';

import JText from './JText';
import {RFPercentage} from 'react-native-responsive-fontsize';

import Pdf from 'react-native-pdf';

import JRow from './JRow';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../config/colors';
import moment from 'moment';

export default function JResumeView({item, setModalVisible, _deleteCV}) {
  const custom_properties = item.custom_properties;

  return (
    <View
      style={{
        alignItems: 'center',
        marginVertical: RFPercentage(2),
        width: '50%',
      }}>
      {custom_properties.is_default && (
        <View
          style={{
            position: 'absolute',
            top: RFPercentage(-1),
            right: RFPercentage(2),

            zIndex: 1,
            height: RFPercentage(4),
            width: RFPercentage(4),
            borderRadius: RFPercentage(4),
            backgroundColor: colors.green[0],
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign
            name="check"
            color={colors.white[0]}
            size={RFPercentage(2.5)}
            style={{}}
          />
        </View>
      )}

      <Pdf
        trustAllCerts={false}
        source={{uri: item?.original_url}}
        onLoadComplete={(numberOfPages, filePath) => {
          // console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          // console.log(`Current page: ${page}`);
        }}
        onError={error => {
          // console.log(error);
        }}
        onPressLink={uri => {
          // console.log(`Link pressed: ${uri}`);
        }}
        style={{
          alignSelf: 'center',
          width: Dimensions.get('window').width / 2.5,
          height: Dimensions.get('window').height / 3.2,
        }}
      />

      <View
        style={{
          justifyContent: 'space-between',
          width: '80%',
          marginTop: RFPercentage(0.5),
        }}>
        <JText
          style={{textTransform: 'capitalize'}}
          fontSize={RFPercentage(2)}
          fontColor="#B7834A">
          {custom_properties.title}
        </JText>
        <JText fontSize={RFPercentage(2)} fontColor={'#848484'}>
          {moment(item.created_at).fromNow()}
        </JText>
      </View>
      <JRow style={{marginTop: RFPercentage(0.5)}}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(item?.original_url);
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: RFPercentage(4),
            width: RFPercentage(4),

            backgroundColor: '#6777EF',
            marginHorizontal: RFPercentage(0.5),
          }}>
          <FontAwesome
            color={colors.white[0]}
            name="upload"
            size={RFPercentage(2.5)}
          />
        </TouchableOpacity>
        <TouchableOpacity
        
          onPress={() => _deleteCV(item.id)}
          style={{
            marginHorizontal: RFPercentage(0.5),
            justifyContent: 'center',
            alignItems: 'center',
            height: RFPercentage(4),
            width: RFPercentage(4),
            backgroundColor: '#FB3449',
          }}>
          <FontAwesome
            color={colors.white[0]}
            name="trash-o"
            size={RFPercentage(2.5)}
          />
        </TouchableOpacity>
      </JRow>
    </View>
  );
}

const styles = StyleSheet.create({});
