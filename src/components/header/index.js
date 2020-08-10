import React, { useEffect, useRef } from 'react';
import { View, Image } from 'react-native';
import styles from './style';


export default function header() {
  return (
    <View style={styles.header}>
      <Image source={require('../../assets/ishopLogoPreta.png')} style={styles.logo} resizeMode= 'contain' />
    </View>
  );
}