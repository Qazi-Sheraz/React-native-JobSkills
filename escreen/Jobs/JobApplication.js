import {StyleSheet, FlatList, View, ScrollView, Pressable} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Chevron from '../../assets/svg/Icon/Chevron.svg';
import JSearchInput from '../../customComponents/JSearchInput';
import JRow from '../../customComponents/JRow';
import JApplication from '../../customComponents/JApplication';
import Sort from '../../assets/svg/Icon/Sort.svg';
import Arrow_Up from '../../assets/svg/Icon/Arrow_Up.svg';
import Arrow_Down from '../../assets/svg/Icon/Arrow_Down.svg';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {StoreContext} from '../../mobx/store';
import RBSheet from 'react-native-raw-bottom-sheet';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {color} from 'react-native-reanimated';

const data = [
  {id: 0, name: 'Taqi Haider', status: 'Applied', Date: '2022-03-15'},
  {id: 1, name: 'Hamza', status: 'Rejected', Date: '2022-04-16'},
  {id: 2, name: 'Sadia', status: 'Shortlisted', Date: '2022-08-05'},
  {id: 3, name: 'Usman', status: 'Interview Scheduled', Date: '2023-03-25'},
  {id: 4, name: 'Yasir', status: 'Drafted', Date: '2023-05-10'},
];
const data1 = [
  {id: 0, name: 'All'},
  {id: 1, name: 'Drafted'},
  {id: 2, name: 'Applied'},
  {id: 3, name: 'Selected'},
  {id: 4, name: 'Shortlisted'},
  {id: 5, name: 'Interview Scheduled'},
];
const JobApplication = () => {
  
  const [selectedItem, setSelectedItem] = useState(data.status);
  const handleSelect = (status) => {
    setSelectedItem(data);
  };
  
  const refRBSheet = useRef();
  const store = useContext(StoreContext);
  const [items, setItems] = useState(data);
  const filterData=(status)=>{
    if(status === 'All'){
      setItems(data)
    }else{

      setItems(data.filter((e)=> e.status === status ))
    }
    refRBSheet.current.close()
  }

  const sortByNameAscending = () => {
    setItems([...items].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const sortByNameDescending = () => {
    setItems([...items].sort((a, b) => b.name.localeCompare(a.name)));
  };
  const sortByRecentApplyDateDescending = () => {
    setItems([...items].sort((a, b) => new Date(b.Date) - new Date(a.Date)));
  };

  return (
    <JScreen>
      <JGradientHeader
        center={
          <JText
            fontColor={colors.white[0]}
            fontWeight="bold"
            fontSize={RFPercentage(2.5)}>
            {'Laraval Job Applicantes'}
          </JText>
        }
        left={<Chevron onPress={() => navigation.goBack()} />}
      />
      <JRow
        style={{
          paddingHorizontal: RFPercentage(2),
          justifyContent: 'space-between',
        }}>
        <JSearchInput
          inputStyle={{width: '75%', alignSelf: 'center'}}
          length={1}
          onChangeText={e => {
            store.setAllFeatureCompanyInput(e);
          }}
          onPressIcon={() => alert('Icon Pressed')}
        />
        <Menu>
          <MenuTrigger style={{alignItems: 'center', justifyContent: 'center'}}>
            <Sort height={RFPercentage(7)} width={RFPercentage(8)} />
          </MenuTrigger>
          <MenuOptions>
            <JText style={styles.menuhead}>Sort by </JText>
            <MenuOption onSelect={sortByNameAscending}>
              <JRow>
                <JText style={styles.menutxt}>Candidate Fit Score </JText>
                <Arrow_Up />
              </JRow>
            </MenuOption>
            <MenuOption onSelect={sortByNameDescending}>
              <JRow>
                <JText style={styles.menutxt}>Candidate Fit Score </JText>
                <Arrow_Down />
              </JRow>
            </MenuOption>
            <MenuOption onSelect={sortByRecentApplyDateDescending}>
              <JText style={styles.menutxt}>Recent Apply Date</JText>
            </MenuOption>
            <MenuOption onSelect={() => refRBSheet.current.open()}>
              <JText style={styles.menutxt}>Status of Application</JText>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </JRow>

      {/* <JApplication Hname={'Taqi Haider'} /> */}
      <ScrollView style={{flex: 1}}>
        {items.map((item, index) => (
          <JApplication
         onSelect={handleSelect}
           Hname={item.name}
            status={item.status}
            ApplyDate={item.Date}
          />
        ))}
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        // closeOnDragDown={false}
        closeOnPressMask={true}
        height={heightPercentageToDP(33)}
        customStyles={{
          container: {
            borderTopLeftRadius: RFPercentage(2.5),
            borderTopRightRadius: RFPercentage(2.5),
          },
          wrapper: {
            backgroundColor: '#00000080',
          },
          draggableIcon: {
            backgroundColor: colors.black[0],
            display: 'none',
          },
        }}>
        <View style={styles.RBView}>
          <JText style={styles.RBHeader}>Status of Applications</JText>

          {data1.map((item, index) => (
            <JText key={index} onPress={()=>filterData(item.name)}    style={styles.RBtxt}>{item.name}</JText>
          ))}
        </View>
       
      </RBSheet>
    </JScreen>
  );
};

export default JobApplication;

const styles = StyleSheet.create({
  menu: {marginTop: RFPercentage(5)},
  menuhead: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(1),
  },
  menutxt: {
    fontSize: RFPercentage(2),
    marginVertical: RFPercentage(0.5),
    paddingHorizontal: RFPercentage(1),
  },
  RBView: {paddingHorizontal: RFPercentage(2.5), paddingTop: RFPercentage(2)},
  RBHeader: {
    fontSize: RFPercentage(2.8),
    fontWeight: 'bold',
    marginVertical: RFPercentage(0.5),
  },
  RBtxt: {
    fontSize: RFPercentage(2.4),
    fontWeight: '600',
    marginVertical: RFPercentage(0.7),
    width: '100%',
  },
});
