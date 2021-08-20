import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { Colors } from '../shared/styles'
import { Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import BeatIndicator from "../components/BeatIndicator"

type Chord = {
  name: string,
  path: number 
}

type Props = {
  chords: Chord[]
  finalBeat: number
  bpm: number
}

const MainScreen = ({chords, finalBeat, bpm}: Props) => {
  const [nextChord, setNextChord] = useState(
    chords[Math.floor(Math.random()*chords.length)]
  )
  const [possibleNextChords, setPossibleNextChords] = useState<Chord[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentBeat, setCurrentBeat] = useState(0)
  const [tock, setTock] = React.useState<any>();
  const [tick, setTick] = React.useState<any>();

  const tockFile = require('../assets/tock.mp3')
  const tickFile = require('../assets/tick.mp3')

  async function playSound(file: any, setCallback: React.Dispatch<React.SetStateAction<any>>) {
    const { sound } = await Audio.Sound.createAsync(
      file
    );
    setCallback(sound);

    await sound.playAsync(); }

  React.useEffect(() => {
    return tock
      ? () => {
          tock.unloadAsync(); }
      : undefined;
  }, [tock]);

  React.useEffect(() => {
    return tick
      ? () => {
          tick.unloadAsync(); }
      : undefined;
    }, [tick]);


  useEffect(() => {
    setPossibleNextChords(chords.filter(chord => chord.name !== nextChord.name))
  }, [nextChord])


  const updateBeat = () => {
    if (currentBeat >= finalBeat) {
      playSound(tickFile, setTick)
      setCurrentBeat(1)
      setNextChord(
        possibleNextChords[Math.floor(Math.random()*possibleNextChords.length)]
      )
      return
    }
    playSound(tockFile, setTock)
    setCurrentBeat((current) => current + 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      isPlaying && updateBeat()
    }, 60000 / bpm);
    return () => clearInterval(interval);
  }, [currentBeat, isPlaying]);

  useEffect(() => {
    !isPlaying && setCurrentBeat(0)
  }, [isPlaying])

  return (
    <View style={styles.container}>
      <View style={styles.topBanner}>
        <Text style={styles.topBannerText}>{bpm}bpm</Text>
      </View>
      <View style={styles.nextChordContainer}>
        <Text style={styles.nextPrompt}>Next:</Text>
        <Image style={styles.nextChord} source={nextChord.path}/>
      </View>
      <View style={styles.bottomContent}>
        <View style={styles.bottomControls}>
          <TouchableOpacity onPress={() => setIsPlaying((current) => !current)}>
            {
              isPlaying ?
              <Feather name="pause" size={80} color={Colors.brown}/> :
              <Feather name="play" size={80} color={Colors.brown}/>
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsMuted((current) => !current)}>
            {
              isMuted ?
              <Feather name="volume-x" size={80} color={Colors.brown}/> :
              <Feather name="volume-2" size={80} color={Colors.brown}/>
            }
          </TouchableOpacity>
        </View>
        <View style={styles.beatIndicatorContainer}>
          {
            Array.apply(null, new Array(finalBeat)).map(( _, i ) => 
              <BeatIndicator active={i < currentBeat} key={i}/>
            )
          }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.beige
  },
  topBanner: {
   width: '100%',
   backgroundColor: Colors.brown,
   alignItems: 'center',
   paddingTop: 30,
  },
  topBannerText: {
    color: Colors.beige,
    fontSize: 40
  },
  nextChordContainer: {
    alignItems: "center",
  },
  nextPrompt: {
    fontSize: 20,
    marginBottom: 20,
    color: Colors.brown
  },
  nextChord: {
    height: 300,
    width: 270,
  },
  bottomContent: {
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  bottomControls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  beatIndicatorContainer: {
    flexDirection: 'row',
    marginTop: 10,
  }
})

export default MainScreen