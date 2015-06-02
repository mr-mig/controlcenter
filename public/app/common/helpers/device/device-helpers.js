var _ = require('lodash');

var hiddenDeviceFilters = [
  function isNestWebservice (device) {
    // TODO: Use a more sophisticated way to identify the nest webservice device
    return device.properties.name.toLowerCase().indexOf('nest account') > -1;
  }
];

var Helpers = {

  augmentDevice: function augmentDevice (device) {
    var alterEgoComponent = Helpers.getAlterEgoComponent(device);
    var deviceActions = _.indexBy(alterEgoComponent.actions, 'name');
    var primaryCapability = Helpers.getPrimaryCapability(alterEgoComponent);
    var hidden = Helpers.isHiddenDevice(device);
    return {
      properties: device.properties,
      alterEgoComponent: alterEgoComponent,
      actions: deviceActions,
      primaryCapability: primaryCapability,
      hidden: hidden
    };
  },

  getAlterEgoComponent: function getAlterEgoComponent (device) {
    return _.find(device.components, (component) =>
      component.properties.id === device.properties.mainComponentId
    );
  },

  getPrimaryCapability: function getPrimaryCapability (component) {
    return component.properties.capabilities[0];
  },

  isHiddenDevice: function isHiddenDevice (device) {
    return _.reduce(hiddenDeviceFilters, (rejected, isHidden) => rejected || isHidden(device), false);
  },

  // TODO: ideally this should be retrieved from the model
  propertyByCapability: {
    'SWITCHABLE': 'SWITCHABLE-on',
    // TODO: Fix typo "set<t>able" in household API (4 fixes total!)
    'SETABLE': 'SETABLE-value'
  },

  getActionForCapability: function getActionForCapability (component, capability, operation) {
    var actionName = operation + '-' + Helpers.propertyByCapability[capability];
    return _.find(component.actions, 'name', actionName);
  }

};

module.exports = Helpers;
