import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'https://www.boredapi.com/api/activity';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: null,
    };
  }

  render() {
    const { activity } = this.state;
    const content =
      activity !== null ? (
        <Text style={styles.text}>{activity}</Text>
      ) : (
        <ActivityIndicator size='large' color='#00ff00' />
      );

    return (
      <View style={styles.container}>
        <View style={styles.textBox}>{content}</View>
        <Text onPress={this.getData} style={styles.refresh}>
          Refresh
        </Text>
      </View>
    );
  }

  getData = () => {
    axios
      .get(API_URL)
      .then(({ data }) => {
        this.setState({ activity: data.activity });
      })
      .catch(error => {
        this.setState({
          activity: 'When all else fails - go out with the camera',
        });
        console.log(error);
      });
  };

  componentDidMount() {
    this.getData();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
  },
  refresh: {
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 20,
  },
});
