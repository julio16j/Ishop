import { Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
export function stringNotNull (string) {
  return string !== null && string !== undefined && string !== ''
}
export function getSistema () {
  switch (Platform.os) {
    case 'android':
      return 1
      break
    case 'ios':
      return 2
      break
    case 'web':
      return 3
      break
    default:
      return 4
      break
  }
}
