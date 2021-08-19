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
import Chords from  './shared/chords'

const selectedChords = Chords.filter(chordData => chordData.name === 'AM' || chordData.name === 'Am' || chordData.name === 'FM')

const TabNavigator = createBottomTabNavigator({
  Main: { 
    screen: () => <MainScreen chords={selectedChords} finalBeat={4}/>,
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
    inactiveBackgroundColor: Colors.lightBrown,
    activeTintColor: Colors.beige,
    inactiveTintColor: Colors.brown
  }
});

const Navigator = createAppContainer(TabNavigator)

export default function App() {
  return (
    <Navigator/>
  )
}
