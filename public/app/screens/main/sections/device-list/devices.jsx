var React = require('react');
var Reflux = require('reflux');

var Room = require('./room');
var DeviceFinder = require('./device-finder');

var roomStore = require('stores/room');
var roomActions = require('actions/room');

var styleMixin = require('mixins/style-mixin');

var DevicesSection = React.createClass({
  mixins: [
    Reflux.connect(roomStore, 'rooms'),
    styleMixin(require('./style.scss'))
  ],

  componentWillMount: function componentWillMount () {
    roomActions.fetchRooms();
  },

  getInitialState: function getInitialState () {
    return { rooms: [] };
  },

  render: function render () {
    var rooms = this.state.rooms.map(function mapper (room, i) {
      return (
        <Room room={room} key={i} />
      );
    });

    return (
      <div className='cc-devices'>
        <DeviceFinder />
        {rooms}
        <a className='cc-devices__button' href='#' onClick={this.handleAddRoom}>+ Add room</a>
      </div>
    );
  },

  handleAddRoom: function handleAddRoom () {
    roomActions.createRoom();
  }
});

module.exports = DevicesSection;
