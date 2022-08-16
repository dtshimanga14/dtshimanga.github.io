import React from 'react';

export default class Head extends React.Component {
	constructor() {
		super();
	}
	render() {
		return React.createElement(
			"div",
			{ className: "row", id: "header_main" },
			React.createElement(
				"header",
				{ className: "col-lg-12 page-header" },
				React.createElement(
					"h5",
					{ id: "date_v" },
					"You're welcome to whiteblue "
				)
			)
		);
	}
}