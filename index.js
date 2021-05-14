import React, { useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  VrButton,
  NativeModules,
  asset
} from 'react-360';

const surfaceModule = NativeModules.surfaceModule;

class InfoPanel extends React.Component {
  state = {
    img: {
      name: 'Vos.png',
      width: 200,
      height: 100,
      show: false,

    }
  }

  transformDisplay(id) {
    this.changeSurface(300, 200, id);
    this.setState({
      img: {
        name: `${id}.jpg`,
        width: 300,
        height: 200,
        show: true
      }
    });
  }

  resetPanel(id) {
    this.changeSurface(200, 100, id);
    this.setState({
      img: {
        name: 'Vos.png',
        width: 200,
        height: 100,
        show: false
      }
    })
  }
  changeSurface(width, hight, id) {
    surfaceModule.resizeSurface(width, hight, id)
  }
  render() {
    let { img } = this.state
    return (
      <View style={styles.display_panel} onEnter={() => { this.transformDisplay(this.props.id) }} onExit={() => { this.resetPanel(this.props.id) }}>
        <Image source={asset(`${img.name}`)} style={{ height: img.height, width: img.width }} />
        {this.state.img.show ?
          <View style={styles.textVeiwBlock} >
            <Text style={styles.textView}>{this.props.text}</Text>
          </View>
          : <View></View>}
      </View>
    )
  }
}

export default class hello_vr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      object: [
        {
          text: 'Осмотреть',
          change: () => { surfaceModule.start() }
        },
        {
          text: 'О нас',
          change: '#'
        },
      ],
      img: {
        name: ['ARex.png', 'Group422.png']
      }
    };
  }
  render() {
    let { img } = this.state
    return (
      <View style={styles.panel}>
        <View style={styles.up_box}>
          <Image source={asset(`${img.name[0]}`)} style={{ height: 25, width: 50 }} />
          <Image source={asset(`${img.name[1]}`)} style={{ height: 25, width: 50, cursor: 'pointer' }} />
        </View>
        <View style={styles.menu_list}>
          {this.state.object.map((item, index) => (
            <VrButton style={styles.button_castom} key={index} onClick={() => item.change()}>
              <Text style={styles.text}>
                {item.text}
              </Text>
            </VrButton>
          ))
          }
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    display: 'flex',
    padding: '5px, 5px, 5px, 5px'
  },
  menu_list: {
    marginTop: 50,
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
  title: {
    color: 'black',
    fontSize: 20,
  },
  display_panel: {
    flexDirection: 'column',
  },
  textVeiwBlock: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderColor: '#C4002F',
    borderWidth: 2,
    width: 300
  },
  textView: {
    color: 'black'
  },
  button_castom: {
    width: 150,
    marginTop: 10
  },
  up_box: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});

AppRegistry.registerComponent('hello_vr', () => hello_vr);
AppRegistry.registerComponent('InfoPanel', () => InfoPanel);

