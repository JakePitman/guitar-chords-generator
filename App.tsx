import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import Chords from "./shared/chords";
import { retrieveValue } from "./storage/storageFunctions";
import Navigator from "./components/TabNavigator";

type ScreenProps = {
  settings: {
    bpm: number;
    finalBeat: number;
    selectedChordsData: { name: string; path: number }[];
  };
};

const filterChords = (selectedChordsString: string) => {
  const selectedChordNames = selectedChordsString.split(",");
  return Chords.filter((chordData) =>
    selectedChordNames.includes(chordData.name)
  );
};

export default function App() {
  const [bpm, setBpm] = useState<number | undefined>(undefined);
  const [finalBeat, setFinalBeat] = useState<number | undefined>(undefined);
  const [selectedChords, setSelectedChords] = useState<
    { name: string; path: number }[] | undefined
  >(undefined);

  useEffect(() => {
    retrieveValue("BPM").then((bpm) => setBpm(parseInt(bpm as string)));
    retrieveValue("FINAL_BEAT").then((beat) =>
      setFinalBeat(parseInt(beat as string))
    );
    retrieveValue("SELECTED_CHORDS").then((selectedChordsString) => {
      const filteredChords =
        selectedChordsString && filterChords(selectedChordsString);
      filteredChords && setSelectedChords(filteredChords);
    });
  }, []);

  if (bpm && finalBeat && selectedChords) {
    return (
      <Navigator
        screenProps={{
          settings: {
            bpm,
            finalBeat,
            selectedChords,
          },
        }}
      />
    );
  }

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>Settings not loaded</Text>
    </View>
  );
}
