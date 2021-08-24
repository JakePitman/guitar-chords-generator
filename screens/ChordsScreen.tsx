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

type ListItemProps = {
  path: number;
};

const ListItem = ({ path }: ListItemProps) => {
  return (
    <View style={styles.listItemContainer}>
      <Image style={styles.chord} source={path} />
      <TouchableOpacity style={styles.chordToggleButton}></TouchableOpacity>
    </View>
  );
};

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
        renderItem={({ item }) => <ListItem path={item.path} />}
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
  listItemContainer: {
    alignItems: "center",
  },
  chord: {
    height: 110,
    width: 100,
    borderWidth: 1,
    margin: 10,
  },
  chordToggleButton: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.brown,
    borderRadius: 15,
  },
  chordToggleButtonActive: {
    backgroundColor: Colors.brown,
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
