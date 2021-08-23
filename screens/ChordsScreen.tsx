import React from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";

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
      <FlatList
        data={Chords}
        keyExtractor={(item) => `${item.name}`}
        renderItem={({ item }) => (
          <Image style={styles.chord} source={item.path} />
        )}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chord: {
    height: 110,
    width: 100,
    borderWidth: 1,
    margin: 10,
  },
});

export default ChordScreen;
