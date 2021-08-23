import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";

import Chords from "../shared/chords";

type Props = {
  selectedChords: {
    name: string;
    path: number;
  }[];
};

const ChordScreen = ({ selectedChords }: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {Chords.map((chord) => (
          <Image style={styles.chord} source={chord.path} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chord: {
    height: 150,
    width: 130,
    borderColor: "black",
    borderWidth: 1,
  },
});

export default ChordScreen;
