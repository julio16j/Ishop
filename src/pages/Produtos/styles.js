import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F2CB07'
  },
  nav: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    paddingLeft: 5,
    height: 50
  },
  navTitle: {
    marginLeft: 20,
    fontSize: 20
  },
  itemImg: {
    height: 100,
    width: 100,
    backgroundColor: "#333333",
  },
  item: {
    backgroundColor: "#ffffff",
    padding: 10
  },
  itensContainer: {
    alignItems: 'center'
  },
  ScrollView: {
    paddingTop: 10,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    margin: 10
  },
});