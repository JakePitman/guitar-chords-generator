import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import MainScreen from "./screens/MainScreen";
import ChordsScreen from "./screens/ChordsScreen";
import BeatScreen from "./screens/BeatScreen";
import { Colors } from "./shared/styles";
import Chords from "./shared/chords";
import { storeValue, retrieveValue } from "./storage/storageFunctions";

const selectedChords = Chords.filter(
  (chordData) =>
    chordData.name === "AM" ||
    chordData.name === "Am" ||
    chordData.name === "FM"
);

const TabNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: () => (
        <MainScreen chords={selectedChords} finalBeat={4} bpm={120} />
      ),
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
      screen: BeatScreen,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
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

const Navigator = createAppContainer(TabNavigator);

export default function App() {
  const [bpm, setBpm] = useState<number | undefined>(undefined);
  const [finalBeat, setFinalBeat] = useState<number | undefined>(undefined);
  const [selectedChords, setSelectedChords] = useState<string[] | undefined>(
    undefined
  );

  useEffect(() => {
    retrieveValue("BPM").then((bpm) => setBpm(parseInt(bpm as string)));
    retrieveValue("FINAL_BEAT").then((beat) =>
      setFinalBeat(parseInt(beat as string))
    );
    retrieveValue("SELECTED_CHORDS").then((chords) =>
      setSelectedChords(chords?.split(","))
    );
  }, []);

  if (bpm && finalBeat && selectedChords) {
    return <Navigator />;
  }

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>Settings not loaded</Text>
    </View>
  );
}
