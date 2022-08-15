import React from 'react';

export default class CoursesMarker extends React.Component {
	constructor() {
		super();
	}
	render() {
		return React.createElement(
			"div",
			{ className: "row" },
			React.createElement(
				"div",
				{ className: "col-lg-12" },
				React.createElement("div", { className: "row" }),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "col-lg-6 fixed-position more-rised-position white-space shadow-style" },
						React.createElement(
							"legend",
							null,
							"Evaluation de cours"
						),
						React.createElement("hr", null),
						React.createElement(
							"span",
							null,
							" Par  par username middlename firstname "
						),
						React.createElement(
							"div",
							{ id: "Bar" },
							React.createElement("div", { id: "time-flow" })
						)
					),
					React.createElement(
						"div",
						{ className: "col-lg-8 question", id: "core_asset_id" },
						"PROJET : CONCEPTION D\u2019UNE PLATEFORME DE GESTION D\u2019ECOLE (BLEU BLANC). 1. Probl\xE9matique A l\u2019heure actuelle, l\u2019instruction devient le besoin le plus important juste apr\xE8s le manger et une population bien instruite constitue la premi\xE8re richesse pour une notion. L\u2019importance de l\u2019instruction est justifi\xE9e par l\u2019effet que la majorit\xE9 des pays d\xE9velopp\xE9s, des \xE9tats subventionnent l\u2019instruction avec plus de 10 pour cent de leurs budgets en moyenne et les parents d\xE9pensent en moyenne 30 pour cent de leurs revenus annuels dans l\u2019\xE9ducation de leurs enfants. Ce qui constitue un investissement \xE9norme, des investissements qui n\xE9cessitent un suivi minutieux de la part de toutes les parties prenantes (parents, enseignants et l\u2019\xE9tat). L\u2019instruction \xE9tant \xE0 la base de toute innovation et de la transformation de notre cher monde, elle retient toute notre attention pour en faire l\u2019\xE9tat de lieu dans notre pays, en Afrique et m\xEAme dans le monde. Dans la plupart des pays, on constate un manque de coordination entre les parents, les enseignants, les concern\xE9s et m\xEAme l\u2019\xE9tat. Tr\xE8s souvent par un manque des moyens d\u2019investiguer ce processus d\u2019\xE9ducation. Certains parents n\u2019h\xE9sitent pas \xE0 \xE9voquer l\u2019effet qu\u2019ils sont oblig\xE9s de quitter leurs foyers dans un sens pour aller travailler et les enfants dans un autre pour \xE9tudier. Et l\u2019\xE9tat quant \xE0 lui \xE9voque un manque d\u2019outil pour justifier son manque d\u2019implication \xE0 la limite du d\xE9sint\xE9ressement. Pour toutes les parties prenantes, les priorit\xE9s sont souvent autres entre plusieurs de leurs occupations. Par cons\xE9quent : - Une formation tr\xE8s peu qualifi\xE9e de nos enfants. 2. Objectif Concepteur de Bleu Blanc",
						React.createElement("div", { className: "row question" })
					)
				),
				React.createElement(
					"button",
					{ className: "button-left", type: "button", value: "follow" },
					"Suivant"
				),
				React.createElement(
					"button",
					{ className: "button-left", id: "asset-button-submit", type: "submit", value: "annuler" },
					"Soumettre"
				)
			)
		);
	}
}