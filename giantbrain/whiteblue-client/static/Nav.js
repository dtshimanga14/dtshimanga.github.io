import React from 'react';
export default class Nav extends React.Component {
	constructor() {
		super();
	}
	render() {
		return React.createElement(
			"div",
			{ className: "row", id: "head_nav" },
			React.createElement(
				"div",
				null,
				React.createElement(
					"nav",
					{ className: "col-lg-12 col-md-12 col-sm-12", id: "main_nav" },
					React.createElement(
						"ol",
						{ id: "listnav" },
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "" },
								React.createElement("img", { src: "icon\\home.jpg", height: "20px", weight: "20px" })
							)
						),
						React.createElement(
							"li",
							{ id: "lessons" },
							React.createElement(
								"a",
								{ href: "/cardmaker" },
								React.createElement("img", { src: "icon\\lecons.jpg", height: "20px", weight: "20px", alt: "Mes le\xE7ons" })
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "" },
								React.createElement("img", { src: "icon\\evaluation.jpg", height: "20px", weight: "20px", alt: "Notifications" })
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "" },
								React.createElement("img", { src: "icon\\succes.jpg", height: "20px", weight: "20px" })
							)
						),
						React.createElement(
							"li",
							{ id: "parcButt" },
							React.createElement("img", { src: "icon\\user.jpg", height: "20px", weight: "20px" })
						),
						React.createElement(
							"li",
							null,
							React.createElement("img", { src: "icon\\etablissement.jpg", height: "20px", weight: "20px" })
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"ol",
								null,
								React.createElement("img", { src: "icon\\preparation.jpg", height: "20px", weight: "20px" }),
								React.createElement(
									"li",
									{ id: "preButt" },
									React.createElement("img", { src: "icon\\cours.jpg", height: "20px", weight: "20px" })
								),
								React.createElement(
									"li",
									null,
									React.createElement("img", { src: "icon\\evaluation.jpg", height: "20px", weight: "20px", alt: "Evaluation" })
								)
							)
						),
						React.createElement(
							"li",
							{ id: "aproButt" },
							React.createElement("img", { src: "icon\\apropos.jpg", height: "20px", weight: "20px" })
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "login.html" },
								React.createElement("img", { src: "icon\\logout.jpg", height: "20px", weight: "20px" })
							)
						)
					)
				)
			)
		);
	}
}