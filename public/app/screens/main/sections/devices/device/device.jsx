var React = require('react');
var Link = require('react-router').Link;
var styleMixin = require('mixins/style-mixin');
var SwitchControl = require('./controls/switch');
var SliderControl = require('./controls/slider');
var DeviceState = require('./../device-state');

var Device = React.createClass({
  mixins: [styleMixin(require('./style.scss'))],

  render: function render () {
    return (
      <div className="cc-device">
        <div className="cc-device__title">
          <Link to="device" params={{deviceId: this.props.device.id}}>
            {this.props.device.title}
          </Link>
        </div>
        <div className="cc-device__type">{this.props.device.type}</div>
        <div className="cc-device__control">{this.getControl()}</div>
        <div className="cc-device__state">
          <DeviceState device={this.props.device}/>
        </div>
      </div>
    );
  },

  getControl: function getControl () {
    var control;
    switch (this.props.device.type) {
      case 'Home Gateway':
        control = SwitchControl;
        break;
      case 'Thermostat':
        control = SliderControl;
        break;
    }
    return control
      ? React.createElement(control, { device: this.props.device })
      : (<div>Unknown type</div>);
  }
});

module.exports = Device;
