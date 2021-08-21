import { AsyncStorage } from "react-native";

const bpmKey = 'MY_BPM';
const finalBeatKey = 'MY_FINAL_BEAT';
const selectedChordsKey = 'MY_SELECTED_CHORDS';

export const storeBpm = async () => {
  try {
    await AsyncStorage.setItem(bpmKey, '4');
  } catch (error) {
    console.log({error})
  }
}

export const retrieveBpm = async () => {
  try {
    const value = await AsyncStorage.getItem(bpmKey);
    if (value !== null) {
      return value
    }
    } catch (error) {
      console.log({error})
    }
}
