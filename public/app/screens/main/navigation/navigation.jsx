var React = require('react'),
  Link = require('react-router').Link,
  StyleMixin = require('mixins/style-mixin');

var Navigation = React.createClass({
  mixins: [StyleMixin(require("./style.scss"))],
  render: function () {
    // TODO: Use mixins instead of CSS classes
    // TODO: Pass number of elements to mixin instead of specifying class name
    var classes = "cc_navigation icon-bar two-up " + this.props.orientation;

    var items = this.props.items.map(function (item, i) {
      return (
        <Link to={item.linkTo} key={i} className="cc_navigation__link item">
          <label>{item.title}</label>
        </Link>
      );
    });

    return (
      <div className={classes}>
        {items}
      </div>
    );
  }
});

module.exports = Navigation;
