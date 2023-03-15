import {FlatList, StyleSheet, Text, RefreshControl} from 'react-native';
import React, {useEffect, useCallback} from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../../customComponents/JScreen';
import {
  _getAllFeatureCompanyData,
  _getAllJobData,
} from '../../../functions/Candidate/BottomTab';
import JText from '../../../customComponents/JText';
import {useContext} from 'react';
import {StoreContext} from '../../../mobx/store';
import JJobTile from '../../../customComponents/JJobTile';
import JEmpty from '../../../customComponents/JEmpty';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import colors from '../../../config/colors';
import JSearchInput from '../../../customComponents/JSearchInput';
import Feather from 'react-native-vector-icons/Feather';
import JCompanyTile from '../../../customComponents/JCompanyTile';
const FeatureCompany = ({navigation}) => {
  const store = useContext(StoreContext);
  useEffect(() => {
    _getAllFeatureCompanyData(store);
    return () => {};
  }, [store.followingList]);

  const onRefresh = useCallback(() => {
    store.setIsRefreshing(true);
    _getAllFeatureCompanyData(store);
    store.setIsRefreshing(false);
  }, []);

  return (
    <JScreen
      isError={store.featureCompanyApiError}
      errorText={'Reload Screen!'}
      onReloadPress={() => _getAllFeatureCompanyData()}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {'Featured Company'}
            </JText>
          }
          left={
            <Feather
              onPress={() => navigation.goBack()}
              name="chevron-left"
              size={RFPercentage(3.5)}
              color={colors.white[0]}
            />
          }
        />
      }
      style={{marginHorizontal: RFPercentage(2)}}>
      {store.featureCompanyApiLoader === true ? (
        <JText>Loading....</JText>
      ) : (
        <React.Fragment>
          <JSearchInput
            length={store.featureCompanyData.featuredCompanies.length}
            onChangeText={e => {
              store.setAllFeatureCompanyInput(e);
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
              store.allFeatureCompanyInput.length === 0
                ? store.featureCompanyData.featuredCompanies
                : store.featureCompanyData.featuredCompanies.filter(e =>
                    e.user.first_name
                      .toLowerCase()
                      .includes(store.allFeatureCompanyInput.toLowerCase()),
                  )
            }
            ListEmptyComponent={() => <JEmpty />}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <JCompanyTile
                onPress={() =>
                  navigation.navigate('CSelectedCompany', {
                    id: item.unique_id,
                  })
                }
                containerStyle={{marginBottom: RFPercentage(2)}}
                companyId={item.id}
                followingList={store.followingList}
                onIconPress={() => alert('Icon Press')}
                location={item.location}
                img={item.company_url}
                title={item.user.first_name}
              />
            )}
            keyExtractor={data => data.id}
          />
        </React.Fragment>
      )}
    </JScreen>
  );
};

export default observer(FeatureCompany);

const styles = StyleSheet.create({});
