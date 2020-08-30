import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    padding: 10,
    backgroundColor: "#dddddd",
    borderRadius: 8,
    alignSelf: "stretch",
    elevation: 5
  },

  header: {
    alignItems: "flex-end",
    paddingRight: 20,
  },

  itens: {
    maxHeight: 350,
  },

  item: {
    backgroundColor: "#ffffff",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  itemImg: {
    height: 100,
    width: 100,
    marginRight: 10,
  },

  itemText: {
    width: 300,
    fontSize: 18,
  },


  itemAmount: {
    fontSize: 18,
    bottom: 0,
    left: 10,
    position: "absolute",
  },

  itemCost: {
    fontSize: 18,
    color: "green",
    bottom: 0,
    right: 60,
    position: "absolute",
  },

  addressView: {
    backgroundColor: "#ffffff",
    padding: 10,
  },

  addressText: {
    fontSize: 18,
    margin: 10,
  },

  addressTextInfo: {
    fontSize: 18,
    margin: 10,
    color: "#999999",
  },

  addressFooter: {
    borderTopWidth: 1,
    borderColor: "#eeeeee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingRight: 5,
  },

  payView: {
    backgroundColor: "#ffffff",
    marginTop: 20,
    padding: 10,
  },

  payForm: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    borderTopWidth: 1,
    paddingTop: 10,
  },

  /*modalContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },

  
  
  modalText: {
    marginBottom: 15,
    fontWeight: "bold"
  }*/

  button: {
    backgroundColor: "#C40233",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});