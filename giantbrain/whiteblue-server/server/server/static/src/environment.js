
import { Environment,Network,
	RecordSource,Store } from 'relay-runtime';

function fecthQuery(operation,variables){
	return fetch('/graphql',{
					method : 'POST',
					headers : {'Content-Type' : 'application/json'},
					body : JSON.stringify({
						query : operation.text,
						variables,
					}),
			}).then(response => {
				return response.json();
			})
}

const environment = new Environment({
	network : Network.create(fecthQuery),
	store : new Store(new RecordSource()),
});