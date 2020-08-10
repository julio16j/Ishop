import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom:6
  },
  esquerda: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom:4
  }
})