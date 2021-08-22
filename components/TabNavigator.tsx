import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import MainScreen from "../screens/MainScreen";
import ChordsScreen from "../screens/ChordsScreen";
import BeatScreen from "../screens/BeatScreen";
import { Colors } from "../shared/styles";

type ScreenProps = {
  screenProps: {
    settings: {
      bpm: number;
      finalBeat: number;
      selectedChords: { name: string; path: number }[];
    };
    setBpm: React.Dispatch<React.SetStateAction<number>>;
    setFinalBeat: React.Dispatch<React.SetStateAction<number>>;
  };
};

const TabNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: ({ screenProps }: ScreenProps) => {
        return <MainScreen settings={screenProps.settings} />;
      },
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <FontAwesome5 name="guitar" size={24} color={tintColor} />
        ),
      },
    },
    Chords: {
      screen: ChordsScreen,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <FontAwesome name="th-list" size={24} color={tintColor} />
        ),
      },
    },
    Beat: {
      screen: ({ screenProps }: ScreenProps) => (
        <BeatScreen
          appBpm={screenProps.settings.bpm}
          setAppBpm={screenProps.setBpm}
          appFinalBeat={screenProps.settings.finalBeat}
          setAppFinalBeat={screenProps.setFinalBeat}
        />
      ),
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="musical-note" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: Colors.brown,
      inactiveBackgroundColor: Colors.lightBrown,
      activeTintColor: Colors.beige,
      inactiveTintColor: Colors.brown,
    },
  }
);

export default createAppContainer(TabNavigator);
