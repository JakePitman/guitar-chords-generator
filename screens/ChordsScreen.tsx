import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import Chords from "../shared/chords";
import { Colors } from "../shared/styles";

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
        style={styles.list}
        data={Chords}
        keyExtractor={(item) => `${item.name}`}
        renderItem={({ item }) => (
          <Image style={styles.chord} source={item.path} />
        )}
        numColumns={3}
      />
      <TouchableOpacity style={styles.saveButtonContainer}>
        <Text style={styles.saveButton}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.beige,
  },
  chord: {
    height: 110,
    width: 100,
    borderWidth: 1,
    margin: 10,
  },
  saveButtonContainer: {
    width: "80%",
    backgroundColor: Colors.lightBrown,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  saveButton: {
    textAlign: "center",
    color: Colors.beige,
    fontSize: 30,
  },
});

export default ChordScreen;
