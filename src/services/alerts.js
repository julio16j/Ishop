import { showMessage } from "react-native-flash-message";
export function errorMessage (mensagem) {
  showMessage({
    message: mensagem,
    type: "danger"
  })
}
export function successMessage (mensagem) {
  showMessage({
    message: mensagem,
    type: "success"
  })
}