import { AsyncStorage } from "react-native";

const bpmKey = 'MY_BPM';
const finalBeatKey = 'MY_FINAL_BEAT';
const selectedChordsKey = 'MY_SELECTED_CHORDS';

type ValueType =
  'BPM' |
  'FINAL_BEAT' |
  'SELECTED_CHORDS'

export const storeValue = async (valueType: ValueType, value: string) => {
  try {
    await AsyncStorage.setItem(valueType, value);
  } catch (error) {
    console.log(`Error storing value: ${value} to value type: ${valueType}`, {error})
  }
}

export const retrieveValue = async (valueType: ValueType) => {
  try {
    const value = await AsyncStorage.getItem(valueType);
    if (value !== null) {
      return value
    }
    } catch (error) {
      console.log(`Error retrieving value from value type: ${valueType}`, {error})
    }
}
