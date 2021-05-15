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

import MuseumInfo from './interface/Museum'

const surfaceModule = NativeModules.surfaceModule;

class InfoPanel extends React.Component {
  state = {
    img: {
      name: 'Group21.png',
      width: 50,
      height: 50,
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
    this.changeSurface(50, 50, id);
    this.setState({
      img: {
        name: 'Group21.png',
        width: 50,
        height: 50,
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
            <Text style={{ color: 'black' }}>{this.props.text}</Text>
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
          text: 'Экспонаты',
          change: () => {
            this.setState({ showExhibitsList: true })
          }
        },
        {
          text: 'О музее',
          change: () => { this.setState({ showExhibitsList: false }) }
        },
        {
          text: 'Осмотреть',
          change: () => { surfaceModule.start() & this.setState({ show: false }) }
        },
      ],
      img: {
        name: ['ARex.png', 'exit.png']
      },
      show: true,
      showExhibitsList: true,
      exhibitsArray: [
        {
          name: 'Экспонат1',
          OnChange: () => { surfaceModule.startChangeBackground('io') },
          image: '1.jpg'
        },
        {
          name: 'Экспонат2',
          OnChange: () => { surfaceModule.startChangeBackground(21) },
          image: '2.jpg'
        },
        {
          name: 'Экспонат3',
          OnChange: () => { surfaceModule.startChangeBackground('urah') },
          image: '3.jpg'
        },
        {
          name: 'Экспонаты4',
          OnChange: () => { surfaceModule.startChangeBackground('sam') },
          image: '4.jpg'
        },
      ]
    };
  }
  render() {
    let { img } = this.state
    return (
      <View>
        {this.state.show ?
          <View style={styles.panel}>
            <View style={styles.up_box}>
              <Image source={asset(`${img.name[0]}`)} style={{ height: 25, width: 50 }} />
              <VrButton onClick={() => {
                this.setState({
                  show: false
                })
              }}>
                <Image source={asset(`${img.name[1]}`)} style={{ height: 50, width: 50, }} />
              </VrButton>
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

            <View style={styles.mainContent}>
              {this.state.showExhibitsList ?
                <View style={styles.exhibitsList}>
                  {this.state.exhibitsArray.map((item, index) => (
                    <View key={index} style={styles.exhibitsCards}>
                      <Image source={asset(`${item.image}`)} style={{ width: 150, height: 100 }} />
                      <VrButton style={styles.button_castom} onClick={() => item.OnChange()} >
                        <Text style={styles.text}>{item.name}</Text>
                      </VrButton>
                    </View>
                  ))}
                </View>
                :
                <View style={styles.museumContent}>
                  <Text style={styles.text}>Исторические парки «Россия – Моя история» - самый масштабный экспозиционный комплекс в России. География его площадок простирается через всю Россию и насчитывает 23 города: Владивосток, Пятигорск, Волгоград, Екатеринбург, Казань, Краснодар, Махачкала, Москва, Нижний Новгород, Новосибирск, Омск, Пермь, Ростов-на-Дону, Самара, Санкт-Петербург, Саратов, Ставрополь, Тюмень, Уфа, Южно-Сахалинск, Якутск, Челябинск, Сургут.</Text>
                  <Text style={styles.text}>Создатели парка - а это историки, художники, кинематографисты, дизайнеры, специалисты по компьютерной графике -  сделали всё, чтобы российская история перешла из категории чёрно-белого учебника в яркое, увлекательное и вместе с тем объективное повествование, чтобы каждый посетитель почувствовал сопричастность к событиям более, чем тысячелетней истории своего Отечества. В историческом парке представлены все новейшие формы информационных носителей:</Text>
                </View>
              }
            </View>

          </View>
          :
          <View>
            <VrButton style={{ height: 50, width: 50, marginLeft: 900, marginTop: 50 }} onClick={() => {
              this.setState({
                show: true
              }) & surfaceModule.end()
            }}>
              <Image source={asset(`${img.name[1]}`)} style={{ height: 50, width: 50, }} />
            </VrButton>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    width: 1000,
    height: 600,
    display: 'flex',
    padding: '5px, 5px, 5px, 5px',
    backgroundColor: 'rgba(0, 0, 0, 0.55)'
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
  display_panel: {
    flexDirection: 'column',
  },
  textVeiwBlock: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderWidth: 2,
    width: 300
  },
  button_castom: {
    width: 150,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
  up_box: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',

  },
  mainContent: {
    backgroundColor: 'rgba(214, 214, 193, 0.39)',
    paddingRight: 15,
    height: 350,

  },
  menu_list: {
    flexDirection: 'row',
    marginTop: 50,
  },
  exhibitsCards: {
    marginLeft: 15,
    marginTop: 15
  },
  exhibitsList: {
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  museumContent: {
    paddingLeft: 15
  }
});

AppRegistry.registerComponent('hello_vr', () => hello_vr);
AppRegistry.registerComponent('InfoPanel', () => InfoPanel);
AppRegistry.registerComponent('Museum', () => MuseumInfo());

