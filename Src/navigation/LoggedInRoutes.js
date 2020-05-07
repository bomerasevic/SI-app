import React from "react"
import { createBottomTabNavigator } from "react-navigation-tabs";
import {} from '@expo/vector-icons';
import Welcome from "../views/Welcome";
import theme from '../assets/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import KreiranjeNarudzbe from "../views/KreiranjeNarudzbe"
import KonacnaNarudzba from "../views/Narudzba"
import { createStackNavigator } from "react-navigation-stack";
import ZaboravljeniPassword from "../views/Password"
import ImportNarudzbe from "../views/ImportNarudzbe"
import NarudzbaImport from "../views/NarudzbaImport"
const StackNavigatorEmployee = createStackNavigator({
  Proizvod: {
    screen: KreiranjeNarudzbe
  },
  Narudzba: {
    screen: KonacnaNarudzba
  }
}
);
const StackNavigatorImport = createStackNavigator({
  Import: {
    screen: ImportNarudzbe
  },
  Narudzba: {
    screen: NarudzbaImport
  }
}
);

const LoggedInRoutes = createBottomTabNavigator({
  
  HOME: {
    screen:Welcome,
    
  },
  DATA:{
    screen:StackNavigatorEmployee,    
  },
  NEKI:{
    screen:StackNavigatorImport,
  },
  PASSWORD:{
    screen:ZaboravljeniPassword,
  }


  // PROFILE: {
  //   screen: StackNavigator,
  //   navigationOptions: {
  //     tabBarIcon: ({ tintColor }) => (
  //       <Icon name='account' size={30} color={tintColor}/>
  //     )
  //   }    
  // }
},
  {
    tabBarOptions: {
      showLabel:false,
      
      activeTintColor: theme.COLORS.BUTTONCOLOR,
      activeColor: theme.COLORS.BUTTONCOLOR,
      inactiveTintColor: 'white',
      labelStyle: {
        fontSize: 16,
        marginBottom:15,
      },
      tabBarVisible: false,
      style: {
        height:0,
        backgroundColor: theme.COLORS.LISTCOLOR,
      },
    }
  },
);

export default LoggedInRoutes;
