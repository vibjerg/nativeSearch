/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image,
  Component,
  NavigatorIOS
  } = React;
var CoverImage = require('./CoverImage');
const WorkScreen = require('./WorkScreen');

const connection = require('./Connection');

connection.emit('getRecommendationsRequest', {
  likes: ['870970-basis:51263146',
    '870970-basis:51115155',
    '870970-basis:28394438',
    '870970-basis:22629344',
    '870970-basis:25915690',
    '870970-basis:24929604',
    '870970-basis:27796664',
    '870970-basis:26588707',
    '870970-basis:23372525',
    '870970-basis:28280041',
    '870970-basis:51342860',
    '870970-basis:28290853'],
  dislikes: []
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
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

var Recommendations = React.createClass({
  getInitialState() {
    return {
      recommendations: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      images: {}
    }
  },
  componentDidMount() {
    connection.on('getRecommendationsResponse', (recommendations) => {
      this.setState({recommendations: this.state.recommendations.cloneWithRows(recommendations)});
    });
  },

  selectWork(work) {
    this.props.navigator.push({
      title: work.title,
      component: WorkScreen,
      passProps: {work, image: this.getImage(work.identifiers, 'detail_500')},
    });
  },

  addImages(identifiers, image) {
    const images = this.state.images;
    console.log(images);
    images[identifiers.toString()] = image;
    this.setState({images});
  },

  getImage(identifiers, size) {

    const image = this.state.images[identifiers.toString()]
      .filter((image) => {
        return (image.size === size);
      })[0];

    return image.url;
  },

  renderRecommendation(recommendation) {
    return (
      <TouchableOpacity onPress={ this.selectWork.bind(this,recommendation)} >
        <View style={styles.container} key={recommendation.identifiers[0]} >
          <CoverImage addImages={this.addImages} identifiers={recommendation.identifiers} ></CoverImage>
          <View style={styles.rightContainer} >
            <Text style={styles.title} >{recommendation.title}</Text>
            <Text style={styles.creator} >{recommendation.creator}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
  render: function () {
    return (
      <View>
        <ListView
          dataSource={this.state.recommendations}
          renderRow={this.renderRecommendation}
          style={styles.listView}
          />
      </View>
    );
  }
});

class RecommendationsApp extends Component {

  render() {
    return (
      <NavigatorIOS
        style={styles.navigator}
        initialRoute={{
          title: 'Recommendations',
          component: Recommendations,
        }}
        />
    );


  }
}
AppRegistry.registerComponent('nativeSearch', () => RecommendationsApp);

module.exports = RecommendationsApp;