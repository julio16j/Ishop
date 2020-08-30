import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  esquerda: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 4
  },

  info: {
    marginRight: 3,
    fontWeight: "bold",
    color: "#BFBFBF"
  },

  valor: {
    color: '#BFBFBF'
  }
})