import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Colors } from '../shared/styles'
import { Feather } from '@expo/vector-icons';

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

  useEffect(() => {
    setPossibleNextChords(chords.filter(chord => chord.name !== nextChord.name))
  }, [nextChord])

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
        <Feather name="pause" size={80} color={Colors.brown}/>
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
    marginBottom: 20
  },
  nextChord: {
    height: 300,
    width: 270,
  },
  bottomContent: {
    marginBottom: 20
  }
})

export default MainScreen