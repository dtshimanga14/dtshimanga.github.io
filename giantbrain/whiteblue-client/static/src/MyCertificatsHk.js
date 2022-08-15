import ReactDOM from 'react-dom';
import { Link, useHistory} from 'react-router-dom';
import 'whatwg-fetch';


import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';

import './css/MyClasses.css';


const MyCertificatsHk = ({ certificatsIds }) => {
	
	const [rollMenu,setRollMenu] = useState(true);
	const history = useHistory();
	
	return (
		<div onClick={() => setRollMenu(!rollMenu)}>
			<Link to="/certificat">
				<button className="btn admin-btn-size">
					<span className="icon-position-admin">
						<i className="fa fa-road"/>
						<div className="bell-layer" >2</div>
					</span>
					<span className="text-button">My Certificats</span>
					<span className="article-caret">
					  {rollMenu ? (<i className="fa fa-caret-down"/>)
						:(<i className="fa fa-caret-left"/>)}
					</span>
				</button>
			</Link>
		</div>
	);
};
export default MyCertificatsHk; 