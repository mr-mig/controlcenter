'use strict';
var React = require("react");
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Navigation = require('common/regions/navigation');
var style = require("./style.scss");

var MainScreen = React.createClass({

	render: function () {
		return (
			<div className="main-screen">
				<div className="main-screen__navigation">
					<Navigation/>
				</div>
				<div className="main-screen__content">
					<RouteHandler/>
				</div>
			</div>
		)
	}
});

module.exports = {
	MainScreen: MainScreen,
	DevicesRegion: require('./devices'),
	SettingsRegion: require('./settings')
};

