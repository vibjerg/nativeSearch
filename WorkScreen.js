'use strict';

const React = require('react-native');
const ParallaxView = require('react-native-parallax-view');

const {
  ActivityIndicatorIOS,
  StyleSheet,
  Text,
  View,
  Component
  } = React;

const connection = require('./Connection');

class WorkScreen extends Component {

  constructor() {
    super();
    this.state = {
      work: null,
    }
  }


  componentDidMount() {
    connection.emit('getOpenSearchWorkRequest', {
      pid: this.props.work.identifiers,
      offset: 1,
      worksPerPage: 1,
      allManifestations: true
    });
    connection.on('getOpenSearchWorkResponse', (response) => {
      this.setState({work: response.work});
    })
  }

  renderWork(work, image) {
    return (
      <ParallaxView
        ref={component => this._scrollView = component}
        backgroundSource={{ uri: image }}
        windowHeight={300}
        //header={HEADER}
        >

        <View style={styles.container} >
          <Text>{work.title}</Text>
          <Text>{work.creator}</Text>
          <Text>{work.abstract}</Text>
          <Text>{work.series}</Text>
          <Text>{work.subjects.join(', ')}</Text>
        </View>
      </ParallaxView>
    );
  }

  renderLoader() {

    return (
      <View style={styles.container} >
        <ActivityIndicatorIOS />
      </View>);
  }

  render() {
    console.log(this.props.image);
    if (this.state.work) {
      const image = this.props.image || "http://i.imgur.com/mEVXC36.jpg";
      return this.renderWork(this.state.work, image);
    }
    else {
      return this.renderLoader();
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'row',
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    //paddingTop: 80
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  creator: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 10,
    backgroundColor: '#F5FCFF',
  },
  navigator: {
    flex: 1,
    backgroundColor: 'red',
  }


});

module.exports = WorkScreen;