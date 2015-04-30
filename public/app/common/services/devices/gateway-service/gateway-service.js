var Rx = require('rx');
require('whatwg-fetch');

var transformGatewayResponse = function transformGatewayResponse (resp) {
  var result = resp || {};
  return result.properties || {};
};

var extractJson = function extractJson (response) {
  return response.json();
};

var gatewayInfoUrl = 'https://householdmockapi-dev.yetu.me/gateway';
module.exports = {
  fetchGatewayInfo: function fetchGatewayInfo () {
    // we can enable polling here
    return Rx.Observable
      .fromPromise(fetch(gatewayInfoUrl)
        .then(extractJson))
      .map(transformGatewayResponse);
  }
};
