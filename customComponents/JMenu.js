import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import JText from './JText'
import JIcon from './JIcon'
import { RFPercentage } from 'react-native-responsive-fontsize'
import colors from '../config/colors'
import { useContext } from 'react'
import { StoreContext } from '../mobx/store'
import { useState } from 'react'
import JRow from './JRow'

const JMenu = ({type,
    filter,
    filter1,
    _search,
    onPress,
    
    isMulti=false,
   setvalues,
values}) => {
const store =useContext(StoreContext);
const [option,setOption]=useState(false);
const [items,setItems]=useState(null);
const [selectedItems, setSelectedItems] = useState([]);




  return (
    <>
    <JRow
    disabled={false}
    onPress={() => {
        setOption(!option) 
    }}
    style={[
      styles.menuV,
     
    ]}>
    <JText
      fontSize={RFPercentage(2)}
      style={{paddingHorizontal: RFPercentage(1)}}>
      {items!==null?items:type}
    </JText>
    <JIcon
      icon={'en'}
      name={
        option === true ? 'chevron-small-up' : 'chevron-small-down'
      }
      color={'#00000090'}
      size={RFPercentage(4)}
    />
  </JRow>
  {option === true && 
      <View
      style={{
        borderWidth: RFPercentage(0.1),
        borderRadius: RFPercentage(1),
        paddingVertical: RFPercentage(1),
      }}>
      
        {filter&&
     Object.entries(filter).map(([id,item]) => (
        isMulti?(
            <JRow
            style={{
              width: '100%',
              paddingHorizontal:RFPercentage(2),
              height: RFPercentage(6),
              backgroundColor: '#EDF2F75E',
              justifyContent: 'space-between',
            //   marginVertical: RFPercentage(1),
            }}>
            <JText>{item}</JText>
            
            <JIcon
            onPress={()=>{ if (selectedItems.includes(id)) {
                setSelectedItems(selectedItems.filter(itemId => itemId !== id));
                setvalues(selectedItems.filter(itemId => itemId !== id))
              } else {
                setSelectedItems([...selectedItems, id]);
                setvalues([...selectedItems, id])
              }}}
              icon={'ma'}
              name={selectedItems.includes(id) ?'checkbox-marked':'checkbox-blank-outline'}
              size={RFPercentage(3.2)}
              color={colors.purple[0]}
           
            />
             
                
            
          </JRow>
        ):
        <JRow
        disabled={false}
        //   key={index}
          style={{
            padding: 10,
            justifyContent: 'space-between',
            
          }}
          onPress={() => {
           setItems(item) 
           setvalues(id)

        //    _search()
           setOption(!option)
           
          }}>
          <JText fontSize={RFPercentage(2) }style={{width:'100%'}}>
            {item}
            
          </JText>
        </JRow>
      ))}
       {filter1&&
      filter1.map((item, index) => (
        <Pressable
          key={index}
          style={{
            padding: 10,
            justifyContent: 'space-between',
            flexDirection: store.lang.id === 0 ? 'row' : 'row-reverse',
            
          }}
          onPress={() => {
           setItems(item)
           setvalues(item)
        //    console.log('itemmmmmmmm',)
           setOption(!option)
           
          }}>
          <JText fontSize={RFPercentage(2) }style={{width:'100%'}}>
            {item}
          </JText>
        </Pressable>
      ))}
    </View>
}</>
  )
}

export default JMenu

const styles = StyleSheet.create({menuV:{
    height: RFPercentage(7),
    marginVertical: RFPercentage(1),
    justifyContent: 'space-between',
    borderRadius: RFPercentage(1),
    backgroundColor: colors.searchBackground[0],
    
   
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    
    elevation: 2,
  },})