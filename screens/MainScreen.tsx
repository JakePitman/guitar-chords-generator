import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { Colors } from '../shared/styles'
import { Feather } from '@expo/vector-icons';

import BeatIndicator from "../components/BeatIndicator"

type Chord = {
  name: string,
  path: number 
}

type Props = {
  chords: Chord[]
}

const MainScreen = ({chords}: Props) => {
  const [nextChord, setNextChord] = useState(
    chords[Math.floor(Math.random()*chords.length)]
  )
  const [possibleNextChords, setPossibleNextChords] = useState<Chord[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentBeat, setCurrentBeat] = useState(0)
  // ---
  // TODO get from props
  const finalBeat = 4

  useEffect(() => {
    setPossibleNextChords(chords.filter(chord => chord.name !== nextChord.name))
  }, [nextChord])


  const updateBeat = () => {
    if (currentBeat >= finalBeat) {
      setCurrentBeat(0)
      setNextChord(
        possibleNextChords[Math.floor(Math.random()*possibleNextChords.length)]
      )
      return
    }
    setCurrentBeat((current) => current + 1)
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBanner}>
        <Text style={styles.topBannerText}>100bpm</Text>
      </View>
      <View style={styles.nextChordContainer}>
        <Text style={styles.nextPrompt}>Next:</Text>
        <Image style={styles.nextChord} source={nextChord.path}/>
      </View>
      <View style={styles.bottomContent}>
        <TouchableOpacity onPress={() => setIsPlaying((current) => !current)}>
          {
            isPlaying ?
            <Feather name="pause" size={80} color={Colors.brown}/> :
            <Feather name="play" size={80} color={Colors.brown}/>
          }
        </TouchableOpacity>
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
   // TODO: use safe space instead
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
    alignItems: 'center'
  },
  beatIndicatorContainer: {
    flexDirection: 'row',
    marginTop: 10,
  }
})

export default MainScreen