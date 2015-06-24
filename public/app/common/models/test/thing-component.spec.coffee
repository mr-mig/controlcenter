ThingMock      = require './thing.mock'
ThingComponent = require '../thing-component'
Capability     = require '../capability'

describe 'ThingComponent', ->

  component = null

  beforeEach ->
    component = new ThingComponent(do ThingMock.FibaroWallplug.getAlterEgoComponent)

  describe 'constructor', ->
    it 'creates an actions map using capability and property as keys', ->
      component.actions.should.deep.equal
        "#{Capability.SWITCHABLE}":
          on:
            get:
              name: 'get-switchable-on'
              href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/socket/actions/switchable-on'
              method: 'GET'
            set:
              name: 'set-switchable-on'
              method: 'PUT'
              fields: [
                {
                  name: 'value'
                  type: 'checkbox'
                }
              ]
              type: 'application/json'
              href: 'https://household-https.dev.yetu.me/things/79802756-46a7-4e8f-b3f5-6bfd22a2c5ba/components/socket/actions/switchable-on'

  describe 'get', ->
    it 'gets a property by capability name', ->
      property = component.get Capability.SWITCHABLE
      property.should.deep.equal
        value: false
        unit: 'BOOLEAN'
        symbol: null



