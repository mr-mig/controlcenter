'use strict';

var React = require('react');
//TODO How do we communicate with sublying components
var Device = require('../device');

var Room = React.createClass({
	render: function () {
		return (
			<div>
				<h3>Hello</h3>
        <Device />
			</div>
		);
	}
});

module.exports = Room;