import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Colors } from '../shared/styles'
import { FontAwesome } from '@expo/vector-icons';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topBanner}>
        <Text style={styles.topBannerText}>100bpm</Text>
      </View>
      <View style={styles.nextChordContainer}>
        <Text style={styles.nextPrompt}>Next:</Text>
        <Image style={styles.nextChord} source={require("../assets/A_major.png")}/>
      </View>
      <View style={styles.bottomContent}>
        <FontAwesome name="pause" size={60} color="black" />
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
   paddingTop: 30
  },
  topBannerText: {
    color: Colors.beige,
    fontSize: 40
  },
  nextChordContainer: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'green'
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