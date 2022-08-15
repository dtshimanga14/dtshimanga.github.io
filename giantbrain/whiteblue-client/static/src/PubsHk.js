import React from 'react';
import ReactDOM from 'react-dom';

/* import './css/Online.css'; */




const PubsHk = () => {
	return(<div className= "online-zone">
				<div>
					<span className="headzone">Somewhere else online </span>
				</div><hr/>
				<div>
					<div>
						<img  className="product-picture" src=""/>
					</div>
					<div className="previous">
						<button className="btn"><i className="fa fa-chevron-left"/></button>
					</div>
					<div className="next">
						<button className="btn"><i className="fa fa-chevron-right"/></button>
					</div>
				</div>
			</div>
		);
	}; 

export default PubsHk;