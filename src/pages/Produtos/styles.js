import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F2CB07',
    paddingTop: 20
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
    fontSize: 20,
    fontWeight: "700"
  },
  itemImg: {
    height: 100,
    width: 150,
    backgroundColor: "#333333"
  },
  item: {
    backgroundColor: "#ffffff"
  },
  itensContainer: {
    alignItems: 'center'
  },
  card: {
    backgroundColor: "#ffffff",
    margin: 10,
    minHeight: 180,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomColor: '#222222',
    marginBottom: 2,
    padding: 1
  },
  cardSubtitle: {
    padding: 1
  }
});