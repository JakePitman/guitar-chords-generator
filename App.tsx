import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import MainScreen from "./screens/MainScreen"
import ChordsScreen from "./screens/ChordsScreen"
import BeatScreen from "./screens/BeatScreen"
import { Colors } from "./shared/styles"

const TabNavigator = createBottomTabNavigator({
  Main: { 
    screen: MainScreen,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => <FontAwesome5 name="guitar" size={24} color={tintColor}/>
    }
  },
  Chords: { 
    screen: ChordsScreen,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => <FontAwesome name="th-list" size={24} color={tintColor}/>
    }
  },
  Beat: { 
    screen: BeatScreen,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => <Ionicons name="musical-note" size={24} color={tintColor}/>
    }
  }
}, {
  tabBarOptions: {
    activeBackgroundColor: Colors.brown,
    activeTintColor: 'white',
    inactiveTintColor: Colors.brown
  }
});

const Navigator = createAppContainer(TabNavigator)

export default function App() {
  return (
    <Navigator/>
  )
}
