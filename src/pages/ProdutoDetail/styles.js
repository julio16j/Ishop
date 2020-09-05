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
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewDetail: {
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    minHeight: 300
  },
  produtoImg: {
    height: 200,
    width: 300,
    backgroundColor: "#333333",
  },
  headerDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomColor: '#222222'
  },
  preco: {
    fontSize: 18
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
  quantidadeProduto: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addProduto: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.8,
    backgroundColor: '#F2CB07',
    padding: 10,
    borderRadius: 20
  },
  itemButtonAdicionar:{
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  valorTotal: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  }
})