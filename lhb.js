import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {allSon: []};
  }

  UNSAFE_componentWillMount() {
    fetch('http://www.cjlly.com:3041/record')
      .then(res => res.json())
      .then(res => {
        this.setState({
          allSon: res,
        });
      });
  }

  delete = item => {
    var res = JSON.parse(JSON.stringify(this.state.allSon));
    for (let i = 0; i < this.state.allSon.length; i++) {
      if (item.id === this.state.allSon[i].id) {
        res.splice(i, 1);
      }
    }
    this.setState({
      allSon: res,
    });
  };

  renderSingerSon = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          height: 95,
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomColor: '#eee',
          borderBottomWidth: 1,
        }}>
        <Text
          style={{
            marginRight: 5,
            color: 'blue',
          }}>
          {index}
        </Text>
        <Image
          source={{uri: item.img}}
          style={{
            height: 90,
            width: 134,
            borderWidth: 2,
            borderColor: '#333',
          }}
        />

        <Text
          style={{
            fontSize: 16,
            flex: 1,
            textAlign: 'left',
            color: '#4fc08d',
            paddingLeft: 20,
          }}>
          {item.name}
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: 50,
              height: 80,
              backgroundColor: '#fff',
              justifyContent: 'center',
              marginRight: 10,
            }}>
            <Text
              style={{
                height: 40,
                width: 50,
                backgroundColor: '#4fc08d',
                color: '#fff',
                textAlign: 'center',
                lineHeight: 40,
              }}
              onPress={() => {
                this.delete(item);
              }}>
              删除
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <Text
          style={{
            fontSize: 20,
            lineHeight: 25,
            paddingTop: 10,
            paddingLeft: 10,
            width: '100%',
            textAlign: 'center',
          }}>
          列表
        </Text>
        {this.state.allSon.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                this.setState({
                  modalVisible: true,
                  info: item,
                });
              }}>
              {this.renderSingerSon({item, index})}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}
module.exports = App;
