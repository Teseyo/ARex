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
      <View style={styles.title_box}>
        <Text style={styles.title}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </Text>
      </View>
      <View style={styles.text_box}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>
    </View>
  );
}

export default hello_vr

const styles = StyleSheet.create({
  panel: {
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_box: {

  },
  text_box: {
    marginTop: 50,
  },
  text: {
    color: 'black'
  },
  title: {
    color: 'black',
    fontSize: 20,
  }
});

AppRegistry.registerComponent('hello_vr', () => hello_vr);
