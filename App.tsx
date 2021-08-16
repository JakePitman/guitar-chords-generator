import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import MainScreen from "./screens/MainScreen"
import ChordsScreen from "./screens/ChordsScreen"
import BeatScreen from "./screens/BeatScreen"

const TabNavigator = createBottomTabNavigator({
  Main: MainScreen,
  Chords: ChordsScreen,
  Beat: BeatScreen,
});

const Navigator = createAppContainer(TabNavigator)

export default function App() {
  return (
    <Navigator/>
  )
}
