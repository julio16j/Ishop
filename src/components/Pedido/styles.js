import { StyleSheet, Dimensions } from 'react-native'
import Constants from 'expo-constants'
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: "#fff"
  },
  options: {
    height: 50,
    justifyContent: 'space-around',
    alignItems: "center",
    flexDirection: "row",
    padding:10,
    borderTopColor: '#C5C5C5',
    borderTopWidth: 1,
    marginTop:10
  },
  textOption: {
    fontSize: 18,
    color: "#F2CB07",
    fontWeight: "900"
  },
  card: {    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    
    elevation: 16,
    marginTop: 15,
    padding: 10,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: 'center',
    borderBottomColor: '#C5C5C5',
    borderBottomWidth: 1,
    marginBottom:4
  },
  nome: {
    fontSize:20,
    fontWeight: "bold",
    color:"#7A7A7A"
  },
  info: {
    flexDirection: "row",
  },
  items: {
    marginTop:5,
    borderBottomColor: '#C5C5C5',
    borderBottomWidth: 1,
  },
  textInfo: {
    fontSize:12,
    color:"#BFBFBF"
  },
  total: {
    marginTop:10,
    justifyContent: "flex-start",
    flexDirection: "row",
  }
})