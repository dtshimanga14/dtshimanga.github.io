let editableShape = {
			header : "Bitcoin: A Peer-to-Peer Electronic Cash System",
			fields : "Cryptomoney",
			description : "We propose a solution to the double-spending problem using a peer-to-peer network version of electronic cash who would allow online payments",
			authors : {
				username : "Satoshi",
				middlename : "Nakamoto",
				firstname : "",
				picture : ""
			},
			approvor : {
				username : "James",
				middlename : "Crock",
			},
	portions : [
		{
			tittle : "Calculations",
			paragraphs : [{
					type : "text",
					content : "We consider the scenario of an attacker trying to generate an alternate chain faster than the honest chain. Even if this is accomplished, it does not throw the system open to arbitrary changes, such as creating value out of thin air or taking money that never belonged to the attacker. Nodes are not going to accept an invalid transaction as payment, and honest nodes will never accept a block containing them. An attacker can only try to change one of his own transactions to take back money he recently spent.",
				},
			],
		},
	],
}