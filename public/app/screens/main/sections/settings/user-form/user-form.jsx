var React = require('react');
var Reflux = require('reflux');
var styleMixin = require('mixins/style-mixin');
var tForms = require('tcomb-form');

var CCForm = require('common/components/cc-form');

var userDataStore = require('stores/user-data');
var userDataActions = require('actions/user-data');


var ControlCenterUser = tForms.struct({
  firstName: tForms.Str,
  lastName: tForms.Str
});

var UserForm = React.createClass({
  mixins: [
    styleMixin(require('./style.scss')),
    Reflux.listenTo(userDataStore, 'onUserDataChanged')
  ],

  onUserDataChanged: function onUserDataChanged (userData) {
    if (userData.model) {
      this.setState(userData.model);
    }
  },

  getInitialState: function getInitialState () {
    return {};
  },

  componentWillMount: function componentWillMount () {
    userDataActions.fetchUserData();
  },

  onValidChange: function onValidChange (value) {
    userDataActions.updateUserData(value);
  },

  render: function render () {
    return (
      <CCForm type={ControlCenterUser} onValidChange={this.onValidChange} value={this.state}/>
    );
  }
});

module.exports = UserForm;
