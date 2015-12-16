window.navigator.userAgent = 'react-native';
var io = require('socket.io-client/socket.io');
//const connection = new io('http://localhost:8080', {jsonp: false});
const connection = new io('https://ddbmobil.demo.dbc.dk', {jsonp: false});
connection.connect();

module.exports = connection;
