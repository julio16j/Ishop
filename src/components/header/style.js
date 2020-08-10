import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

var { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  header:{
    paddingTop: Constants.statusBarHeight > 0 ? Constants.statusBarHeight + 10 : 20 ,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: "#F2CB07",
    height:100,
  },
  logo: {
    marginTop:20,
    height: height/10,
    width: width/2,

  }
})