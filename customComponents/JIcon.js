import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Zocial from 'react-native-vector-icons/Zocial'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default function JIcon(
    {
      onPress,
        icon,
        name,
        color,
        size=RFPercentage(2.5),
        style
    }
) {
  return (
    icon === 'an' ?

 
   <AntDesign onPress={onPress} name={name} color={color} size={size} style={style}/>
   :
   icon === 'en' ?

 
   <Entypo onPress={onPress} name={name} color={color} size={size} style={style}/>
   :
   icon === 'ev' ?

 
   <EvilIcons onPress={onPress} name={name} color={color} size={size} style={style}/>
   :

   icon === 'fe' ?

 
   <Feather onPress={onPress} name={name} color={color} size={size} style={style}/>
   :
   icon === 'fa' ?

 
   <FontAwesome onPress={onPress} name={name} color={color} size={size} style={style}/>
   :  icon === 'fa5' ?

 
   <FontAwesome5 onPress={onPress} name={name} color={color} size={size} style={style}/>
   :
   icon === 'fa5pro' ?

 
   <FontAwesome5Pro onPress={onPress} name={name} color={color} size={size} style={style}/>
   :
   icon === 'ft' ?

 
   <Fontisto onPress={onPress} name={name} color={color} size={size} style={style}/>
   :
   icon === 'fd' ?

 
   <Foundation onPress={onPress} name={name} color={color} size={size} style={style}/>
   :

   icon === 'io' ?

 
   <Ionicons onPress={onPress} name={name} color={color} size={size} style={style}/>
   :
   icon === 'ma' ?

 
   <MaterialCommunityIcons onPress={onPress} name={name} color={color} size={size} style={style}/>
   :
   icon === 'mi' ?

 
   <MaterialIcons onPress={onPress} name={name} color={color} size={size} style={style}/>
   :
   icon === 'oc' ?

 
   <Octicons onPress={onPress} name={name} color={color} size={size} style={style}/>
   :
   icon === 'sm' ?

 
   <SimpleLineIcons onPress={onPress} name={name} color={color} size={size} style={style}/>
   :
   <Zocial onPress={onPress} name={name} color={color} size={size} style={style}/>


  )
}

const styles = StyleSheet.create({})
