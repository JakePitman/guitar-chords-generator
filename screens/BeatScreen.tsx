import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const BeatScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Beat Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default BeatScreen
