var React = require('react');
var styleMixin = require('mixins/style-mixin');
var cx = require('classname');

var SwitchControl = React.createClass({
  mixins: [ styleMixin(require('./style.scss')) ],

  getInitialState: function getInitialState () {
    return { checked: this.props.value || false };
  },

  // TODO: Remove this (and only use props)
  componentWillReceiveProps: function componentWillReceiveProps (nextProps) {
    this.setState({ checked: nextProps.value || false });
  },

  render: function render () {

    var className = cx(
      'cc-switch-control',
      this.state.checked
        ? 'cc-switch-control__on'
        : 'cc-switch-control__off'
      );

    return (
      <div className={className} onClick={this.toggle} />
    );
  },

  toggle: function toggle () {
    this.setState({ checked: !this.state.checked }, () => {
      this.props.onChange(this.state);
    });
  }

});

module.exports = SwitchControl;
