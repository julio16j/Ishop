import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import { color } from 'react-native-reanimated'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  option: {
    flexDirection: 'row',
    padding: 10,
    opacity: 0.6,
    backgroundColor:'transparent',
    marginTop: 10,
    justifyContent: 'space-between'
  },
  optionText: {
    fontSize: 18,
    color: '#333',
    fontWeight: "900"
  },
  icon:{
    height: 30,
    width: 30,
    alignItems: 'center',
    resizeMode: "contain"

  }
})