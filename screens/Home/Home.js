import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useContext, useCallback} from 'react';
import CLHome from '../../loaders/Candidate/Home/CLHome';
import JScreen from '../../customComponents/JScreen';
import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import JHeader from '../../customComponents/JHeader';
import JText from '../../customComponents/JText';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JLogoImage from '../../customComponents/JLogoImage';
import JGradientScreen from '../../customComponents/JGradientScreen';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import JShadowView from '../../customComponents/JShadowView';
import colors from '../../config/colors';
import JGradientView from '../../customComponents/JGradientView';
import JSideHeading from '../../customComponents/JSideHeading';
import JJobTile from '../../customComponents/JJobTile';
import url from '../../config/url';
import JScrollView from '../../customComponents/JScrollView';
import JEmpty from '../../customComponents/JEmpty';

function Home({navigation}) {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(true);

  const store = useContext(StoreContext);

  const getData = () => {
    fetch(`${url.baseUrl}/home`)
      .then(res => res.json())
      .then(res => {
        setLoader(true);
        setData(res.data);
        setLoader(false);
      });
  };

  const onRefresh = useCallback(() => {
    store.setIsRefreshing(true);
    getData();
    store.setIsRefreshing(false);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <JScreen
      onTryAgainPress={() => getData()}
      style={{paddingHorizontal: RFPercentage(2)}}
      internet={true}
      header={
        <JHeader
          left={
            <Feather
              onPress={() => navigation.openDrawer()}
              name="menu"
              size={RFPercentage(3.5)}
            />
          }
          center={
            <JLogoImage
              height={heightPercentageToDP(5)}
              width={widthPercentageToDP(15)}
              tintColor={null}
            />
          }
          right={
            <MaterialCommunityIcons
              onPress={() => navigation.navigate('CNotification')}
              name="bell-badge-outline"
              size={RFPercentage(3.5)}
            />
          }
        />
      }>
      {loader === true ? (
        <CLHome />
      ) : (
        <React.Fragment>
          <JShadowView
            onPress={() => navigation.navigate('CSearch')}
            shadowColor={colors.purple[0]}
            containerStyle={{
              borderWidth: RFPercentage(0.1),
              borderColor: colors.white[0],
              justifyContent: 'center',
              paddingLeft: RFPercentage(1),
              height: '7%',
            }}>
            <JText fontColor={colors.placeHolderColor[0]}>Search</JText>
          </JShadowView>

          <JScrollView refreshing={store.isRefreshing} onRefresh={onRefresh}>
            <JSideHeading
              leftHeading={'Popular Categories'}
              onRightHeadingPress={() => alert('sEE all')}
            />
            <View>
              <FlatList
                horizontal
                data={data.categories}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <JGradientView
                    containerStyle={{
                      width: RFPercentage(14),
                      height: RFPercentage(14),
                      marginRight: RFPercentage(0.5),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <JText fontColor={colors.white[0]}>{item.name}</JText>
                    <JText fontColor={colors.white[0]}>
                      ({item.jobs_count})
                    </JText>
                  </JGradientView>
                )}
                keyExtractor={data => data.name}
              />
            </View>

            <JSideHeading
              leftHeading={'Featured Company'}
              rightHeading={'See All'}
              onRightHeadingPress={() => navigation.navigate('CFeatureCompany')}
            />
            {data.featuredCompanies[0] ? (
              <JJobTile
                onPress={() =>
                  navigation.navigate('CSelectedCompany', {
                    id: data.featuredCompanies[0].unique_id,
                  })
                }
                onIconPress={() => alert('Icon Press')}
                type="company"
                isempty={data.featuredCompanies[0] ? false : true}
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
            {data.featuredJobs[0] ? (
              <JJobTile
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

            {data.latestJobs.length > 0 ? (
              data.latestJobs.map((item, index) => (
                <React.Fragment key={index}>
                  <JJobTile
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
