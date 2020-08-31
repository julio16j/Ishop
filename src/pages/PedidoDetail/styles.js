import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 22,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginVertical: 20,
    marginLeft: 10,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 15,
  },

  cardText: {
    fontSize: 18,
  },

  item: {
    backgroundColor: "#ffffff",
    padding: 10,
    flexDirection: "row",
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

  itemAmount: {
    fontSize: 18,
    bottom: 0,
    left: 0,
    position: "absolute",
  },

  itemCost: {
    fontSize: 18,
    color: "green",
    bottom: 0,
    right: 10,
    position: "absolute",
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

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#ffffff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
    marginTop: 20,
    marginBottom: 50
  },

  buttonDisponivel: {
    width: 150,
    padding: 20,
    borderRadius: 14,
  },

  button: {
    backgroundColor: "#C40233",
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
    fontSize: 16,
  },
});