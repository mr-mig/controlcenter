// refer to
// https://github.com/yetu/thing-specification/blob/master/src/main/resources/ThingSpecification.xmi

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
      url: Helpers.getDeviceUrl(device),
      hidden: hidden
    };
  },

  getAlterEgoComponent: function getAlterEgoComponent (device) {
    return _.find(device.components, (component) =>
      component.properties.id === device.properties.mainComponentId
    );
  },

  primaryCapabilityByType: {
    SOCKET: 'SWITCHABLE',
    LAMP: 'SWITCHABLE',
    METER: 'MEASUREMENT',
    SENSOR: 'MEASUREMENT',
    BATTERY: 'SETABLE',
    WEBSERVICE: 'SETABLE',

    THERMOSTAT: 'SETABLE'
  },

  getPrimaryCapability: function getPrimaryCapability (component) {
    var componentType = component.properties.type;
    return Helpers.primaryCapabilityByType[componentType];
  },

  getDeviceUrl: function getDeviceUrl (device) {
    var link = _.find(device.links, function getLinkToSelf (linkObject) {
      return linkObject.rel[0] === 'self';
    });
    return link.href;
  },

  isHiddenDevice: function isHiddenDevice (device) {
    return _.some(hiddenDeviceFilters, (filter) => filter(device));
  },

  // TODO: ideally this should be retrieved from the model
  propertyByCapability: {
    SWITCHABLE: 'SWITCHABLE-on',
    // TODO: Fix typo "set<t>able" in household API (4 fixes total!)
    SETABLE: 'SETABLE-value',
    MEASUREMENT: 'MEASUREMENT-measurement'
  },

  getActionForCapability: function getActionForCapability (component, capability, operation) {
    var actionName = operation + '-' + Helpers.propertyByCapability[capability];
    return _.find(component.actions, 'name', actionName);
  }

};

module.exports = Helpers;
