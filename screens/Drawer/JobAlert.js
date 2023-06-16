import {
  FlatList,
  StyleSheet,
  Text,
  Switch,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import {useState} from 'react';
import JRow from '../../customComponents/JRow';
import JButton from '../../customComponents/JButton';
import {useEffect} from 'react';
import {useContext} from 'react';
import {StoreContext} from '../../mobx/store';
import {JToast} from '../../functions/Toast';
import JChevronIcon from '../../customComponents/JChevronIcon';
const JobAlert = ({navigation}) => {
  const [loader, setLoader] = useState([]);
  const store = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [apiLoader, setApiLoader] = useState(false);

  const changeValue = (e, index) => {
    let items = [...data];
    let item = {
      ...items[index],
      bool: e,
    };
    items[index] = item;
    // console.log(items);

    setData([...items]);
  };

  const _getData = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('https://dev.jobskills.digital/api/job-alert', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result[0]);
        let arr = [
          {
            name: 'Notify Me',
            bool: result[0].candidate.job_alert == 1 ? true : false,
          },
        ];
        result[0].jobTypes.forEach(item => {
          if (result[0].jobAlerts.includes(item.id)) {
            arr.push({
              name: item.name,
              bool: true,
              id: item.id,
            });
          } else {
            arr.push({
              name: item.name,
              bool: false,
              id: item.id,
            });
          }
        });
        // console.log('>>', arr);

        setData(arr);
        setLoader(false);
      })
      .catch(error => {
        // console.log('error', error);

        setLoader(false);
      });
  };

  const _updateData = () => {
    let arr = [];
    let formdata = new FormData();
    data.forEach((item, index) => {
      if (index === 0) {
        formdata.append('job_alert', item.bool ? '1' : '0');
      } else {
        if (item.bool === true) {
          arr.push(item.id);
        }
      }
    });
    formdata.append('job_types', JSON.stringify(arr));

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    // console.log(requestOptions);
    setApiLoader(true);
    fetch('https://dev.jobskills.digital/api/job-alert-update', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);

        JToast({
          type: 'success',
          text1: 'Successfully Updated',
        });
      })
      .catch(error => {
        // console.log('error', error);
        JToast({
          type: 'error',
          text1: 'Error while Updating',
        });
      })
      .finally(() => {
        setApiLoader(false);
      });
  };
  useEffect(() => {
    _getData();
  }, []);
  return (
    <JScreen
      headerShown={true}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.job_alert}
            </JText>
          }
          left={
           <JChevronIcon/>
          }
          right={loader && <ActivityIndicator />}
        />
      }>
      <FlatList
        style={{
          margin: RFPercentage(2),
        }}
        data={data}
        renderItem={({item, index}) => (
          <JRow
            style={{
              justifyContent: 'space-between',
              marginBottom: index === 0 ? RFPercentage(6) : RFPercentage(2),
            }}>
            <JText
              style={{
                fontSize: index === 0 ? RFPercentage(2.5) : RFPercentage(1.8),
                fontWeight: index === 0 ? 'bold' : 'normal',
              }}>
              {item.name}
            </JText>
            <Switch
              trackColor={{true: colors.purple[0], false: colors.black[0]}}
              onValueChange={e => {
                changeValue(e, index);
              }}
              value={item.bool}
            />
          </JRow>
        )}
        keyExtractor={(item, index) => index}
      />
      <JButton
        isValid={!apiLoader}
        onPress={() => _updateData()}
        style={{
          position: 'absolute',
          bottom: RFPercentage(2),
          width: RFPercentage(20),
        }}>
        {store.lang.save}
      </JButton>
    </JScreen>
  );
};

export default observer(JobAlert);

const styles = StyleSheet.create({});
