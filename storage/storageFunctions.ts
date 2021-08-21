import { AsyncStorage } from "react-native";

const bpmKey = "MY_BPM";
const finalBeatKey = "MY_FINAL_BEAT";
const selectedChordsKey = "MY_SELECTED_CHORDS";

type ValueType = "BPM" | "FINAL_BEAT" | "SELECTED_CHORDS";

export const storeValue = async (valueType: ValueType, value: string) => {
  try {
    await AsyncStorage.setItem(valueType, value);
  } catch (error) {
    console.log(`Error storing value: ${value} to value type: ${valueType}`, {
      error,
    });
  }
};

export const retrieveValue = async (valueType: ValueType) => {
  try {
    const value = await AsyncStorage.getItem(valueType);
    if (value) {
      return value;
    } else {
      // Default values
      switch (valueType) {
        case "BPM":
          return "60";
        case "FINAL_BEAT":
          return "4";
        case "SELECTED_CHORDS":
          return "";
      }
    }
  } catch (error) {
    console.log(`Error retrieving value from value type: ${valueType}`, {
      error,
    });
  }
};

export const initValues = async () => {
  const bpm = await retrieveValue("BPM");
  const finalBeat = await retrieveValue("FINAL_BEAT");
  const selectedChords = await retrieveValue("SELECTED_CHORDS");

  !bpm && storeValue("BPM", "my default bpm");
  !finalBeat && storeValue("FINAL_BEAT", "my default final beat");
  !selectedChords && storeValue("SELECTED_CHORDS", "my default chords");
};
