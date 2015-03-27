var React = require('react');
var Reflux = require('reflux');

var Room = require('./room');
var DeviceFinder = require('./device-finder');
var Button = require('common/components/controls/button');
var Header = require('common/components/header');

var roomActions = require('actions/room');

var styleMixin = require('mixins/style-mixin');

var DevicesSection = React.createClass({

  mixins: [
    styleMixin(require('./style.scss'))
  ],

  render: function render () {
    return (
      <div className='cc-devices grid-14 padded'>
        <Header>
          <DeviceFinder />
        </Header>
        <Room title='Living Room' />
        <div className='row fixed-height-1'/>
        <Button onClick={ this.handleAddRoom }> + Add Room </Button>
      </div>
    );
  },

  handleAddRoom: function handleAddRoom () {
    roomActions.createRoom();
  }
});

module.exports = DevicesSection;
