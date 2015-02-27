var React = require('react');
var DevicesPage = require('pages/devices');
var SettingsPage = require('pages/settings');
var Navigation = require('./components/navigation/navigation.jsx');

var deviceRooms = [
    {title: 'Home', devices: [
        {title: 'yetu Home Gateway', type: 'Home Gateway', connected: true},
        {title: 'Nest', type: 'Thermostat', connected: true}
    ]},
    {title: 'Living room', devices: [
        {title: 'Nest', type: 'Thermostat', connected: false}
    ]},
    {title: 'Bed room', devices: []}
];

var addRoom = function() {
    deviceRooms.push({title: 'New room', devices: []});
    // TODO: This doesn't integrate well with the component lifecycle. shouldn't we call #setProps instead?
    // TODO: Use Flux pattern
    render();
};

var navigationItems = [
    {title: 'My devices', page: DevicesPage, props: {rooms: deviceRooms, addRoom: addRoom}},
    {title: 'My settings', page: SettingsPage},
];

function render() {
    React.render(<Navigation items={navigationItems} />, document.getElementById('navigation'));
}

render();
