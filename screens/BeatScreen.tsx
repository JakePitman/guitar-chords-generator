import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { storeValue } from "../storage/storageFunctions";
import { Colors } from "../shared/styles";

type Props = {
  appBpm: number;
  setAppBpm: React.Dispatch<React.SetStateAction<number>>;
  appFinalBeat: number;
  setAppFinalBeat: React.Dispatch<React.SetStateAction<number>>;
};

const InvalidMessage = ({
  visible,
  message,
}: {
  visible: boolean;
  message: string;
}) => {
  return <Text style={styles.invalidMessage}>{visible ? message : ""}</Text>;
};

const BeatScreen = ({
  appBpm,
  setAppBpm,
  appFinalBeat,
  setAppFinalBeat,
}: Props) => {
  const [bpmInput, setBpmInput] = useState(appBpm.toString());
  const [bpmInputTouched, setBpmInputTouched] = useState(false);
  const [finalBeatInput, setFinalBeatInput] = useState(appFinalBeat.toString());
  const [finalBeatInputTouched, setFinalInputInputTouched] = useState(false);

  const bpmInputIsValid = () => {
    const numericBpm = parseInt(bpmInput);
    if (numericBpm < 50 || numericBpm > 120 || Number.isNaN(numericBpm)) {
      return false;
    } else return true;
  };

  const finalBeatInputIsValid = () => {
    const numericFinalBeat = parseInt(finalBeatInput);
    if (
      numericFinalBeat < 2 ||
      numericFinalBeat > 9 ||
      Number.isNaN(numericFinalBeat)
    ) {
      return false;
    } else return true;
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>BPM</Text>
        <TextInput
          style={styles.inputField}
          value={bpmInput}
          onChangeText={(val) => {
            if (val === "" || !Number.isNaN(parseInt(val))) {
              setBpmInput(val);
            }
          }}
          keyboardType="numeric"
          maxLength={3}
          onFocus={() => {
            setBpmInputTouched(true);
          }}
        />
        <InvalidMessage
          visible={bpmInputTouched && !bpmInputIsValid()}
          message="Must be a number between 50 - 120"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Beats per change</Text>
        <TextInput
          style={styles.inputField}
          value={finalBeatInput}
          onChangeText={(val) => {
            if (val === "" || !Number.isNaN(parseInt(val))) {
              setFinalBeatInput(val);
            }
          }}
          keyboardType="numeric"
          maxLength={1}
          onFocus={() => setFinalInputInputTouched(true)}
        />
        <InvalidMessage
          visible={finalBeatInputTouched && !finalBeatInputIsValid()}
          message="Must be a number between 2 - 9"
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          if (bpmInputIsValid() && finalBeatInputIsValid) {
            setAppBpm(parseInt(bpmInput));
            setAppFinalBeat(parseInt(finalBeatInput));
          }
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
    backgroundColor: Colors.beige,
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
    textAlign: "center",
    margin: 20,
  },
  inputTitle: {
    color: Colors.brown,
    fontSize: 20,
  },
  inputField: {
    color: Colors.brown,
    textAlign: "center",
    fontSize: 80,
    width: "50%",
    borderColor: Colors.brown,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
  invalidMessage: {
    color: "crimson",
    fontWeight: "bold",
  },
});

export default BeatScreen;
