import React, { useState } from "react";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { storeValue } from "../storage/storageFunctions";

type Props = {
  appBpm: number;
  setAppBpm: React.Dispatch<React.SetStateAction<number>>;
  appFinalBeat: number;
  setAppFinalBeat: React.Dispatch<React.SetStateAction<number>>;
};

const BeatScreen = ({
  appBpm,
  setAppBpm,
  appFinalBeat,
  setAppFinalBeat,
}: Props) => {
  const [bpmInput, setBpmInput] = useState(appBpm.toString());
  const [finalBeatInput, setFinalBeatInput] = useState(appFinalBeat.toString());

  return (
    <View style={styles.container}>
      <TextInput
        value={bpmInput}
        onChangeText={(val) => {
          storeValue("BPM", val).then((res) => {
            setBpmInput(val);
          });
        }}
      />
      <TextInput
        value={finalBeatInput}
        onChangeText={(val) => {
          setFinalBeatInput(val);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setAppBpm(parseInt(bpmInput));
          setAppFinalBeat(parseInt(finalBeatInput));
        }}
      >
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BeatScreen;
