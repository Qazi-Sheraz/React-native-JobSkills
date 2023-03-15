import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import React, {useContext, useCallback} from 'react';
import CLHome from '../../loaders/Candidate/Home/CLHome';
import JScreen from '../../customComponents/JScreen';
import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import JHeader from '../../customComponents/JHeader';
import JText from '../../customComponents/JText';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JLogoImage from '../../customComponents/JLogoImage';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import JShadowView from '../../customComponents/JShadowView';
import colors from '../../config/colors';
import JGradientView from '../../customComponents/JGradientView';
import JSideHeading from '../../customComponents/JSideHeading';
import JJobTile from '../../customComponents/JJobTile';
import JScrollView from '../../customComponents/JScrollView';
import JEmpty from '../../customComponents/JEmpty';
import {_getHomeData} from '../../functions/Candidate/BottomTab';
import translation from '../../config/translation';
import JCompanyTile from '../../customComponents/JCompanyTile';
import {_searchFilter} from '../../functions/CFilter';

function Home({navigation}) {
  const store = useContext(StoreContext);
  const data = store.homeData;

  const onRefresh = useCallback(() => {
    store.setIsRefreshing(true);
    setTimeout(() => {
      _getHomeData(store);

      store.setIsRefreshing(false);
    }, 2000);
  }, []);

  return (
    <JScreen
      isError={store.homeApiError}
      onTryAgainPress={() => _getHomeData(store)}
      style={{paddingHorizontal: RFPercentage(2)}}
      internet={true}
      header={
        <JHeader
          left={
            <Feather
              color={colors.black[0]}
              onPress={() => navigation.openDrawer()}
              name="menu"
              size={RFPercentage(3.5)}
            />
          }
          center={
            <JLogoImage
              height={heightPercentageToDP(6.5)}
              width={widthPercentageToDP(15)}
              tintColor={null}
            />
          }
          right={
            <MaterialCommunityIcons
              color={colors.black[0]}
              onPress={() => navigation.navigate('CNotification')}
              name="bell-badge-outline"
              size={RFPercentage(3.5)}
            />
          }
        />
      }>
      {store.homeApiLoader === true ? (
        <CLHome />
      ) : (
        <React.Fragment>
          <JShadowView
            onPress={() => navigation.navigate('CSearch')}
            shadowColor={colors.purple[0]}
            containerStyle={{
              marginBottom: RFPercentage(2),
              borderWidth: RFPercentage(0.1),
              borderColor: `${colors.purple[0]}50`,

              paddingLeft: RFPercentage(1),
              height: heightPercentageToDP(6),

              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Feather
              name="search"
              size={RFPercentage(2.8)}
              color={colors.placeHolderColor[0]}
              style={{
                marginRight: RFPercentage(1),
                // position: 'absolute',
                // right: 0,
              }}
            />
            <JText
              fontColor={colors.placeHolderColor[0]}
              fontSize={RFPercentage(2)}>
              Job Tilte,Skill or Company
            </JText>
          </JShadowView>

          <JScrollView refreshing={store.isRefreshing} onRefresh={onRefresh}>
            <JSideHeading
              leftHeading={'Popular Categories'}
              rightHeading={
                store.filterDataApiLoader && (
                  <ActivityIndicator
                    style={{marginRight: RFPercentage(1)}}
                    size="small"
                    color={colors.black[0]}
                  />
                )
              }
              onRightHeadingPress={() => alert('sEE all')}
            />

            <FlatList
              horizontal
              data={data.categories}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <JGradientView
                  onPress={() => {
                    const values = {
                      category: {
                        id: item.id,
                      },
                    };

                    _searchFilter(values, store, navigation);
                  }}
                  containerStyle={{
                    width: RFPercentage(14),
                    height: RFPercentage(14),
                    marginRight: RFPercentage(0.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <JText fontColor={colors.white[0]}>{item.name}</JText>
                  <JText fontColor={colors.white[0]}>({item.jobs_count})</JText>
                </JGradientView>
              )}
              keyExtractor={data => data.name}
            />

            <JSideHeading
              leftHeading={'Featured Company'}
              rightHeading={'See All'}
              onRightHeadingPress={() => navigation.navigate('CFeatureCompany')}
            />
            {data.featuredCompanies?.length > 0 ? (
              <JCompanyTile
                followingList={store.followingList}
                companyId={data.featuredCompanies[0].id}
                onPress={() =>
                  navigation.navigate('CSelectedCompany', {
                    id: data.featuredCompanies[0].unique_id,
                  })
                }
                onIconPress={() => alert('Icon Press')}
                location={data.featuredCompanies[0].location}
                img={data.featuredCompanies[0].company_url}
                title={data.featuredCompanies[0].user.first_name}
              />
            ) : (
              <JJobTile isempty={true} />
            )}

            <JSideHeading
              leftHeading={'Featured Job'}
              rightHeading={'See All'}
              onRightHeadingPress={() => navigation.navigate('CFeatureJob')}
            />
            {data.featuredJobs?.length > 0 ? (
              <JJobTile
                favouriteData={store.favouriteList}
                jobId={data.featuredJobs[0].id}
                onPress={() =>
                  navigation.navigate('CSelectedJob', {
                    id: data.featuredJobs[0].job_id,
                  })
                }
                onIconPress={() => alert('Icon Press')}
                type="job"
                location={data.featuredJobs[0].city_name}
                category={data.featuredJobs[0].job_category.name}
                img={data.featuredJobs[0].company.company_url}
                title={data.featuredJobs[0].job_title}
              />
            ) : (
              <JJobTile type="job" isempty={true} />
            )}

            <JSideHeading
              leftHeading={'Latest Jobs'}
              rightHeading={'See All'}
              onRightHeadingPress={() => navigation.navigate('CAllJobs')}
            />

            {data.latestJobs?.length > 0 ? (
              data.latestJobs.map((item, index) => (
                <React.Fragment key={index}>
                  <JJobTile
                    favouriteData={store.favouriteList}
                    jobId={item.id}
                    onPress={() =>
                      navigation.navigate('CSelectedJob', {
                        id: item.job_id,
                      })
                    }
                    onIconPress={() => alert('Icon Press')}
                    type="job"
                    title={item.job_title}
                    location={item.city_name}
                    category={item.job_category.name}
                    img={item.company.company_url}
                    containerStyle={{marginVertical: RFPercentage(1)}}
                  />
                </React.Fragment>
              ))
            ) : (
              <JEmpty />
            )}
          </JScrollView>
        </React.Fragment>
      )}
    </JScreen>
  );
}

export default observer(Home);
const styles = StyleSheet.create({});
