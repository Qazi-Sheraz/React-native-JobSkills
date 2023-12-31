import {ActivityIndicator, StyleSheet, FlatList, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import JScreen from '../../customComponents/JScreen';
import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import JText from '../../customComponents/JText';
import JGradientHeader from '../../customComponents/JGradientHeader';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JNotification from '../../customComponents/JNotification';
import JChevronIcon from '../../customComponents/JChevronIcon';
import url from '../../config/url';
import JEmpty from '../../customComponents/JEmpty';
import {JToast} from '../../functions/Toast';
import CLNotification from '../../loaders/Candidate/Notification/CLNotification';

function Notification({navigation, route}) {
  const store = useContext(StoreContext);
  const [data, setData] = useState();
  const [loader, setLoader] = useState(true);
  const params = route.params || {};
  const {id} = params;
  // console.log('id',params.id)
  // console.log('data',data.notification)

  const _notify = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    fetch(
      store.token?.user?.owner_type.includes('Candidate') == false
        ? `${url.baseUrl}/get-notification`
        : `${url.baseUrl}/get-candidate-notification`,
      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      },
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setData(result);
      })

      .catch(error => {
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.error_while_getting_data,
        });
      })
      .finally(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
    _notify();
  }, [loader]);

  return (
    <JScreen
      onTryAgainPress={() => _notify()}
      header={
        <JGradientHeader
          left={<JChevronIcon />}
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.notification}
            </JText>
          }
        />
      }>
      {loader ? (
        // <ActivityIndicator/>
        <CLNotification />
      ) : (
        <View style={{marginTop: RFPercentage(1)}}>
          <FlatList
            data={data?.notification}
            ListEmptyComponent={<JEmpty />}
            renderItem={
              ({item, index}) => <JNotification item={item} allData={data} />
              // console.log(item)
            }
          />
          {/* <JText>{id}</JText> */}
        </View>
      )}
    </JScreen>
  );
}

export default observer(Notification);
const styles = StyleSheet.create({});
