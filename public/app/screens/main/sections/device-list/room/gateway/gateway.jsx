var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');

var Link = require('react-router').Link;
var DeviceStateIcon = require('common/components/device-state/device-state-icon');
var DeviceStateText = require('common/components/device-state/device-state-text');

var gatewayStore = require('stores/gateway');

module.exports = React.createClass({

  mixins: [
    Reflux.connect(gatewayStore, 'gateway')
  ],

  render: function render () {
    if (this.state.gateway.error) {
      return (<span>Gateway Error</span>);
    }

    return (
      <div className='cc-gateway row fixed-height-1'>
        {
          _.isEmpty(this.state.gateway.model)
            ? this.loadingMessage()
            : this.content()
        }
      </div>
    );
  },

  content: function content () {
    return [
      <div className='cc-device__title columns small-11 quarter-padded-left'>
        <Link to='gateway'>
          <h4>Home gateway</h4>
        </Link>
      </div>,
      <div className='cc-device__state columns small-1 text-center'>
        <DeviceStateIcon connected={ this.state.gateway.model.online } />
      </div>,
      <div className='cc-device__state columns small-2 text-center'>
        <DeviceStateText connected={ this.state.gateway.model.online } />
      </div>
    ];
  },

  loadingMessage: function loadingMessage () {
    return (
      <div className='cc-gateway row fixed-height-1'>
        <h4>Loading</h4>
      </div>
    );
  }

});
