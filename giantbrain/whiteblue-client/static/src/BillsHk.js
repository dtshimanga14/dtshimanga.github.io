import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, useLocation,
		Link, NavLink,Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import gql from "graphql-tag";
import moment from 'moment';
import AddTeacherModalWindows from './AddTeacherModalWindows.js';
	
import { GET_PROMOTION_BY_SCHOOL } from './queries.js';
import { PAY_BILL } from './mutations.js';
//import { GET_ASSESS } from './subscriptions.js';
import Loading from './Loading.js';
import './css/BillsFrame.css';



const BillsHk = () => {
	
	  const [bills, setBills] = useState({
		  promotionId : "", devise : "",
		  destinator : "5dd137d95390a5064468978f", cost : 0
	  });//cost
	  
	  let schoolId = ""//localStorage.getItem("schoolId");
	  let pupilId = ""//localStorage.getItem("userId");
	  let pOwnerId = ""//localStorage.getItem("promotionId");
	  let payer = ""//localStorage.getItem("userId");
	  let emittor = ""//localStorage.getItem("userId");
	  
	  const onForm =(event)=> {//handlerInputChange
		setBills((prev)=> { 
			return { ...prev, [event.target.name] : event.target.value }
		});
		alert(typeof event.target.value)
	}
		
	  const { loading, error, data } = useQuery(GET_PROMOTION_BY_SCHOOL,
				{ variables: { schoolId , pupilId : bills.destinator,
				promotionId : bills.promotionId }
		});
	  
	if (loading) return (<Loading />);
	if (error) return `Error! ${error.message}`;
		
		let { getPromotionBySchool, getBills } = data;
		
	return(
		<div>
			<div className="top-bar">
				<label className="sort-teachers-label">Sort by</label>
			</div>
			<div className="core-courses">
				<div className="one-field">
					<div>
						<label forHtml="pays">Promotion </label>
						<select name="pays" id="promotionId" value={bill.promotionId}
								onChange={onForm}>
						{getPromotionBySchool.map((promotion)=>(
								<option value={promotion._id}>
									{promotion.promotionName} 
								</option>
						))}
						</select>
					</div>
					<div>
						<label forHtml="destinator">Recipient </label>
						<select name="destinator" id="destinator">
							<option value="5dd137d95390a5064468978f">Yolande Pham</option>
						</select>
					</div>
					<div>
						<label forHtml="cost">Amount </label>
						<input name="cost" type="number" value={bill.cost} onChange={onForm}/>
					</div>
					<div>
						<label forHtml="devise">Devise </label>
						<select name="devise" id="devise" value={bill.devise} onChange={onForm}>
							<option value="CDF">CDF</option>
							<option value="$">Dollars amercian</option>
							<option value="euro">euro</option>
						</select>
					</div>
					<button className="btn" onClick={(e) => {
						  onPayBills({ variables: { emittor , destinator ,payer ,
							cost : parseInt(cost), promotionId ,devise
						}});
					}}>
						<i className="fa fa-tags"/><span className="text-button">Pay</span>
					</button>
				</div>
			</div>
			// <div className="bills-main-frame">
				// <div className="tittle-billing">
					// Billing
					// <span className="save-bill"><i className="fa fa-plus"/></span>
				// </div><hr/>
				// {getBills.map((bill)=>(<div>
						// <div className="date-billing">{bill.date}</div><hr/>
						// <div className="summary-bill">
							// <span className="owner-bill">
								// <Link to="cv/5cdf094ac1beac0fcc851fe6">
									// {bill.payer.personals.username}{' '}{bill.payer.personals.middlename}
								// </Link>
							// </span>
							 // pay {bill.cost} For 
							// <span className="destinator-bill">
								// <Link to={`cv/${bill.payer.personals._id}`}>current user</Link>
							// </span>
						// </div><hr/>
				// </div>))}
			// </div>
		 </div>
	);
};

export default BillsHk;


	
	
		