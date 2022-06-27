import {StyleSheet, FlatList, RefreshControl, View} from 'react-native';
import React, {useEffect, useContext, useCallback, useState} from 'react';
import JScreen from '../../customComponents/JScreen';
import JText from '../../customComponents/JText';
import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import JJobTile from '../../customComponents/JJobTile';
import {RFPercentage} from 'react-native-responsive-fontsize';

import colors from '../../config/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import JSearchInput from '../../customComponents/JSearchInput';
import CLFavouriteJob from '../../loaders/Candidate/FavouriteJob/CLFavouriteJob';
import JEmpty from '../../customComponents/JEmpty';
import JGradientHeader from '../../customComponents/JGradientHeader';
import url from '../../config/url';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {getAppliedJobsMenuItems} from '../../data/appliedJobs';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
function AppliedJobs({navigation}) {
  const store = useContext(StoreContext);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [select, setSelect] = useState('All');
  const getAppliedJobList = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${url.baseUrl}/applied-jobs`, requestOptions)
      .then(response => response.json())
      .then(res => {
        setLoader(true);
        setError(false);
        setInput('');
        setSelect('');
        store.setAppliedJobList(res);
        setLoader(false);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response && error.response.data,
        });
        setError(true);
      });
  };

  const onRefresh = useCallback(() => {
    store.setIsRefreshing(true);
    getAppliedJobList();
    store.setIsRefreshing(false);
  }, []);

  useEffect(() => {
    getAppliedJobList();

    return () => {};
  }, []);

  return (
    <JScreen
      isError={error}
      errorText={'Reload Screen!'}
      onReloadPress={() => getAppliedJobList()}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {'Applied Job'}
            </JText>
          }
          right={
            loader === false && (
              <Menu>
                <MenuTrigger>
                  <Entypo
                    name="dots-three-vertical"
                    size={RFPercentage(3.5)}
                    color={colors.white[0]}
                  />
                </MenuTrigger>

                <MenuOptions>
                  {['All', ...store.appliedJobList.statusArray].map(
                    (item, index) => (
                      <MenuOption
                        style={{
                          marginLeft: RFPercentage(1),
                          paddingVertical: RFPercentage(1.5),
                        }}
                        key={index}
                        onSelect={() => {
                          setSelect(item);
                        }}>
                        <JText>{item}</JText>
                      </MenuOption>
                    ),
                  )}
                </MenuOptions>
              </Menu>
            )
          }
        />
      }
      style={{marginHorizontal: RFPercentage(2)}}>
      {loader === true ? (
        <CLFavouriteJob />
      ) : (
        <React.Fragment>
          <JSearchInput
            onChangeText={e => {
              setInput(e);
            }}
            onPressIcon={() => alert('Icon Pressed')}
          />
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={store.isRefreshing}
                onRefresh={onRefresh}
              />
            }
            data={
              input.length > 0
                ? store.appliedJobList[0].filter(e =>
                    e.job.job_title.toLowerCase().includes(input.toLowerCase()),
                  )
                : select.length > 0 && select !== 'All'
                ? store.appliedJobList[0].filter(
                    e =>
                      store.appliedJobList.statusArray[
                        e.status
                      ].toLowerCase() === select.toLowerCase(),
                  )
                : store.appliedJobList[0]
            }
            ListEmptyComponent={() => <JEmpty />}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <JJobTile
                type="appliedjob"
                containerStyle={{marginBottom: RFPercentage(2)}}
                // isJob={true}
                //img={item.job.company.company_url}
                title={item.job.job_title}
                location={item.job.city.name}
                category={item.job.job_category.name}
                status={store.appliedJobList.statusArray[item.status]}
              />
            )}
            keyExtractor={data => data.id}
          />
        </React.Fragment>
      )}
    </JScreen>
  );
}

export default observer(AppliedJobs);

const styles = StyleSheet.create({});
