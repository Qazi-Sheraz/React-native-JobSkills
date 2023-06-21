import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useContext, useCallback, useEffect} from 'react';
import JScreen from '../../customComponents/JScreen';
import JText from '../../customComponents/JText';
import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import JJobTile from '../../customComponents/JJobTile';
import {RFPercentage} from 'react-native-responsive-fontsize';

import colors from '../../config/colors';

import JSearchInput from '../../customComponents/JSearchInput';
import CLFavouriteJob from '../../loaders/Candidate/FavouriteJob/CLFavouriteJob';
import JEmpty from '../../customComponents/JEmpty';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JCompanyTile from '../../customComponents/JCompanyTile';
import Feather from 'react-native-vector-icons/Feather';
import {_getFollowingCompanyData} from '../../functions/Candidate/DFollowing';
import JChevronIcon from '../../customComponents/JChevronIcon';

function Followings({navigation}) {
  const store = useContext(StoreContext);

  const onRefresh = useCallback(() => {
    store.setIsRefreshing(true);

    setTimeout(() => {
      _getFollowingCompanyData(store);

      store.setIsRefreshing(false);
    }, 2000);
  }, []);

  return (
    <JScreen
      onTryAgainPress={() => _getFollowingCompanyData(store)}
      isError={store.followingApiError}
      errorText={'Reload Screen!'}
      onReloadPress={() => _getFollowingCompanyData(store)}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.following_company}
            </JText>
          }
          left={
        <JChevronIcon onPress={()=>{ store.setFollowingInput(''),navigation.goBack()}} />
          }
        />
      }
      style={{marginHorizontal: RFPercentage(2)}}>
      {store.followingApiLoader == true ? (
        <CLFavouriteJob />
      ) : (
        <React.Fragment>
          <JSearchInput
            length={store.followingList?.length}
            onChangeText={e => {
              store.setFollowingInput(e);
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
              store.followingInput?.length === 0
                ? store.followingList
                : store.followingList?.filter(e =>
                  e.company_name?.toLowerCase().includes(store.followingInput.toLowerCase()) ||
                  e.employer_name?.toLowerCase().includes(store.followingInput.toLowerCase())
                  )
            }
            ListEmptyComponent={() => <JEmpty />}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <JCompanyTile
                onPress={() =>
                  navigation.navigate('CSelectedCompany', {
                    id: item.company_unique_id,
                  })
                }
                containerStyle={{marginTop: RFPercentage(1)}}
                followingList={store.followingList}
                companyId={item.company_id}
                location={`${item?.city_name!==null?item?.city_name:''} ${item?.state_name!==null?item?.state_name:''} ${item?.country_name!==null?item?.country_name:'N/A'}`}
                img={item.company_url}
                title={item.company_name?item.company_name:item.employer_name}
              />
            )}
            keyExtractor={data => data.id}
          />
        </React.Fragment>
      )}
    </JScreen>
  );
}

export default observer(Followings);

const styles = StyleSheet.create({});
