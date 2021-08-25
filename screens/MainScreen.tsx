import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Colors } from "../shared/styles";
import { Audio } from "expo-av";

import BeatIndicator from "../components/BeatIndicator";
import PlaybackControls from "../components/PlaybackControls";

type Chord = {
  name: string;
  path: number;
};

type Props = {
  settings: {
    selectedChords: Chord[];
    finalBeat: number;
    bpm: number;
  };
};

const MainScreen = ({ settings }: Props) => {
  const { bpm, finalBeat, selectedChords } = settings;
  const [nextChord, setNextChord] = useState(
    selectedChords[Math.floor(Math.random() * selectedChords.length)]
  );
  const [possibleNextChords, setPossibleNextChords] = useState<Chord[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [tock, setTock] = React.useState<any>();
  const [tick, setTick] = React.useState<any>();

  const tockFile = require("../assets/tock.mp3");
  const tickFile = require("../assets/tick.mp3");

  async function playSound(
    file: any,
    setCallback: React.Dispatch<React.SetStateAction<any>>
  ) {
    const { sound } = await Audio.Sound.createAsync(file);
    setCallback(sound);

    await sound.playAsync();
  }

  React.useEffect(() => {
    return tock
      ? () => {
          tock.unloadAsync();
        }
      : undefined;
  }, [tock]);

  React.useEffect(() => {
    return tick
      ? () => {
          tick.unloadAsync();
        }
      : undefined;
  }, [tick]);

  useEffect(() => {
    setPossibleNextChords(
      selectedChords.filter(
        (chord: { name: string; path: number }) => chord.name !== nextChord.name
      )
    );
  }, [nextChord]);

  useEffect(() => {
    setNextChord(
      selectedChords[Math.floor(Math.random() * selectedChords.length)]
    );
  }, [selectedChords]);

  const updateBeat = () => {
    if (currentBeat >= finalBeat) {
      !isMuted && playSound(tickFile, setTick);
      setCurrentBeat(1);
      setNextChord(
        possibleNextChords[
          Math.floor(Math.random() * possibleNextChords.length)
        ]
      );
      return;
    }
    !isMuted && playSound(tockFile, setTock);
    setCurrentBeat((current) => current + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      isPlaying && updateBeat();
    }, 60000 / bpm);
    return () => clearInterval(interval);
  }, [currentBeat, isPlaying]);

  useEffect(() => {
    !isPlaying && setCurrentBeat(0);
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      <View style={styles.topBanner}>
        <Text style={styles.topBannerText}>{bpm}bpm</Text>
      </View>
      <View style={styles.nextChordContainer}>
        <Text style={styles.nextPrompt}>Next:</Text>
        <Image style={styles.nextChord} source={nextChord.path} />
      </View>
      <View style={styles.bottomContent}>
        <PlaybackControls
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <View style={styles.beatIndicatorContainer}>
          {Array.apply(null, new Array(finalBeat)).map((_, i) => (
            <BeatIndicator active={i < currentBeat} key={i} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.beige,
  },
  topBanner: {
    width: "100%",
    backgroundColor: Colors.brown,
    alignItems: "center",
    paddingTop: 30,
  },
  topBannerText: {
    color: Colors.beige,
    fontSize: 40,
  },
  nextChordContainer: {
    alignItems: "center",
  },
  nextPrompt: {
    fontSize: 20,
    marginBottom: 20,
    color: Colors.brown,
  },
  nextChord: {
    height: 300,
    width: 270,
  },
  bottomContent: {
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
  },
  beatIndicatorContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});

export default MainScreen;
