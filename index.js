import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-360';

const hello_vr = () => {
  return (
    <View style={styles.panel}>
      <Image source={asset('vos.png')} style={styles.img_container} />
    </View>
  );
}

export default hello_vr

const styles = StyleSheet.create({
  panel: {
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
  img_container: {
    height: 100,
    width: 100
  }
});

AppRegistry.registerComponent('hello_vr', () => hello_vr);
