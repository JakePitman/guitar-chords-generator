import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import MainScreen from "./screens/MainScreen"
import ChordsScreen from "./screens/ChordsScreen"
import BeatScreen from "./screens/BeatScreen"

const TabNavigator = createBottomTabNavigator({
  Main: { 
    screen: MainScreen,
    navigationOptions: {
      tabBarIcon: <FontAwesome5 name="guitar" size={24} color="black" /> 
    }
  },
  Chords: { 
    screen: ChordsScreen,
    navigationOptions: {
      tabBarIcon: <FontAwesome name="th-list" size={24} color="black" />
    }
  },
  Beat: { 
    screen: BeatScreen,
    navigationOptions: {
      tabBarIcon: <Ionicons name="musical-note" size={24} color="black" />
    }
  },
});

const Navigator = createAppContainer(TabNavigator)

export default function App() {
  return (
    <Navigator/>
  )
}
