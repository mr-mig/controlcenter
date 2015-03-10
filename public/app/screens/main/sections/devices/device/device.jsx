var React = require('react');
var Link = require('react-router').Link;
var styleMixin = require('mixins/style-mixin');
var SwitchControl = require('./controls/switch');
var SliderControl = require('./controls/slider');

var Device = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  render: function render () {
    return (
      <div className="cc-device">
        <Link className="cc-device__title" to="device" params={{deviceId: this.props.device.id}}>
          {this.props.device.title}
        </Link>
        <div className="cc-device__type">{this.props.device.type}</div>
        <div className="cc-device__control">{this.control()}</div>
        <div className={'cc-device__state-image ' + this.stateImageClass()}/>
        <div className="cc-device__state-text">{this.connectedText()}</div>
      </div>
    );
  },

  onTitleClick: function onTitleClick () {
    this.props.onDeviceClick(this.props.device, this.props.room);
  },

  control: function control () {
    var ctrl;
    switch (this.props.device.type) {
      case 'Home Gateway':
        ctrl = SwitchControl;
        break;
      case 'Thermostat':
        ctrl = SliderControl;
        break;
    }
    return ctrl ? React.createElement(ctrl, {device: this.props.device}) : (<div>Unknown type</div>);
  },

  stateImageClass: function stateImageClass () {
    var name = 'cc-device__state-image-';
    if (this.props.device.state === 'connected') {
      return name + 'connected';
    } else {
      return name + 'disconnected';
    }
  },

  connectedText: function connectedText () {
    if (this.props.device.state === 'connected') {
      return 'Connected';
    } else {
      return 'Disconnected';
    }
  }
});

module.exports = Device;
