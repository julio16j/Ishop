import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: "#F2CB07",
    justifyContent: "center"
  },
})