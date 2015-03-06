'use strict';
var React = require('react');
var StyleMixin = require('mixins/style-mixin');

var SwitchControl = React.createClass({
  mixins: [StyleMixin(require('./style.scss'))],

  getInitialState() {
    return {checked: this.props.checked || false};
  },

  render: function () {
    return (
      <div className={'cc-switch-control ' + (this.state.checked ? 'cc-switch-control__on' : 'cc-switch-control__off')} onClick={this.toggle} />
    );
  },

  toggle: function () {
    this.setState({checked: !this.state.checked});
  }

});

module.exports = SwitchControl;
