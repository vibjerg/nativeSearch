/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  View,
  Image,
  } = React;

const connection = require('./Connection');

var CoverImage = React.createClass({
  getInitialState() {
    return {
      imageUrl: 'http://i.imgur.com/mEVXC36.jpg'
    }
  },
  componentDidMount() {
    connection.emit('getCoverImageRequest', this.props.identifiers);
    connection.on('getCoverImageResponse', (result) => {
      //console.log(result);
      if (result.identifiers.toString() === this.props.identifiers.toString() && result.result.images.length > 0) {
        const smallImage = result.result.images.filter((image) => {
          return (image.size === 'detail_117');
        })[0];
        if (this.props.addImages) {
          this.props.addImages(this.props.identifiers, result.result.images);
        }
        this.setState({imageUrl: smallImage.url});
      }
    });
  },

  render: function () {
    return (
        <Image style={styles.thumbnail} source={{uri: this.state.imageUrl}} />
    );
  }
});

const styles = {
  thumbnail: {
    width: 53,
    height: 81,
  },
};

module.exports = CoverImage;