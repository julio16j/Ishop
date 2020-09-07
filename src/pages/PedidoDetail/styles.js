import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F2CB07",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 20,
    margin: 10,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    width: "95%",
    alignSelf: "center",
  },

  cardText: {
    fontSize: 18,
  },

  item: {
    backgroundColor: "#ffffff",
    padding: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#c5c5c5",
  },

  itemImg: {
    height: 100,
    width: 100,
    backgroundColor: "#333333",
  },

  itemFooter: {
    flex: 1,
    marginLeft: 10,
  },

  itemButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 100,
    position: "absolute",
    bottom: 0,
  },

  itemButton: {
    height: 25,
    width: 25,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center"
  },

  itemButtonText: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },

  itemCost: {
    bottom: 0,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
  },

  itemCostText: {
    fontSize: 18,
    color: "green",
    marginLeft: 5,
  },

  total: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#c5c5c5",
  },

  addressText: {
    fontSize: 18,
    marginVertical: 10,
    color: "#999999",
  },

  addressFooter: {
    borderTopWidth: 1,
    borderColor: "#eeeeee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingRight: 10,
  },

  payForm: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },

  totalValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
  },

  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    marginTop: 20,
  },

  buttonDisponivel: {
    width: 150,
    height: 70,
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: "#c5c5c5",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});