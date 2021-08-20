import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';

import { Colors } from "../shared/styles"

type Props = {
  isMuted: boolean,
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>,
  isPlaying: boolean,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
}

const PlaybackControls = ({ isMuted, setIsMuted, isPlaying, setIsPlaying }: Props) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsMuted((current) => !current)}>
        {
          isMuted ?
          <Feather name="volume-x" size={80} color={Colors.brown}/> :
          <Feather name="volume-2" size={80} color={Colors.brown}/>
        }
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsPlaying((current) => !current)}>
        {
          isPlaying ?
          <Feather name="pause" size={80} color={Colors.brown}/> :
          <Feather name="play" size={80} color={Colors.brown}/>
        }
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
})

export default PlaybackControls