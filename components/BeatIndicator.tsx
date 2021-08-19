import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Colors } from "../shared/styles"

type Props = {
  active: boolean
}

const BeatIndicator = ({active}: Props) => {
  return (
    <View 
      style={{ ...styles.container, ...active ? styles.active : {} }}
    ></View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    width: 15,
    height: 15,
    borderColor: Colors.brown,
    borderWidth: 1,
    borderRadius: 3
  },
  active: {
    backgroundColor: Colors.brown
  }
})

export default BeatIndicator