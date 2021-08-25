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
import { storeValue } from "../storage/storageFunctions";

type ListItemProps = {
  path: number;
  isSelected: boolean;
  handlePress: () => void;
};

const ListItem = ({ path, isSelected, handlePress }: ListItemProps) => {
  return (
    <View style={styles.listItemContainer}>
      <TouchableOpacity onPress={handlePress}>
        <Image style={styles.chord} source={path} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.chordToggleButton,
          ...(isSelected ? styles.chordToggleButtonActive : {}),
        }}
      ></TouchableOpacity>
    </View>
  );
};

type Props = {
  selectedChords: {
    name: string;
    path: number;
  }[];
  updateSelectedChords: (newSelectedChordsString: string) => void;
};

const ChordScreen = ({ selectedChords, updateSelectedChords }: Props) => {
  const selectedChordNames = selectedChords.map((chord) => chord.name);

  const handlePress = (pressedChordName: string) => {
    let newSelectedChordNames: string[];
    if (selectedChordNames.includes(pressedChordName)) {
      newSelectedChordNames = selectedChordNames.filter(
        (chordName) => chordName !== pressedChordName
      );
    } else {
      newSelectedChordNames = [...selectedChordNames, pressedChordName];
    }
    if (newSelectedChordNames.length < 2) {
      return;
    }
    storeValue("SELECTED_CHORDS", newSelectedChordNames.join(",")).then(() =>
      updateSelectedChords(newSelectedChordNames.join(","))
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Chords}
        keyExtractor={(item) => `${item.name}`}
        renderItem={({ item }) => (
          <ListItem
            path={item.path}
            isSelected={selectedChordNames.includes(item.name)}
            handlePress={() => handlePress(item.name)}
          />
        )}
        numColumns={3}
      />
      <Text style={styles.warningMessage}>
        Must have at least two chords selected
      </Text>
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
    marginBottom: 30,
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
  warningMessage: {
    width: "100%",
    backgroundColor: Colors.beige,
    textAlign: "center",
    color: "red",
    padding: 10,
  },
  saveButton: {
    textAlign: "center",
    color: Colors.beige,
    fontSize: 30,
  },
});

export default ChordScreen;
