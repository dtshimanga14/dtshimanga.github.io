import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import moment from 'moment';
import Loading from './Loading.js';
import AddTeacherModalWindows from './AddTeacherModalWindows.js';

import './css/BillsFrame.css';

	export default class BillsFrame extends React.Component {
			
		constructor(props){
			super(props);
			this.state = {
				fields : {
					promotionId : "",
					devise : "CDF",
					destinator :"5dd137d95390a5064468978f" ,
					cost : 0,
				},
			};
			this.handlerInputChange = this.handlerInputChange.bind(this);
		}
	handlerInputChange(event){
		const fields = this.state.fields;
		fields[event.target.name] = event.target.value;
		this.setState({ fields });
		alert(typeof event.target.value)
	}
		render (){ 
				
		const GET_PROMOTION_BY_SCHOOL = gql`
			query getPromotionBySchool($schoolId : String,$pupilId : String,$promotionId : String){
			  getPromotionBySchool(schoolId: $schoolId) {
				_id
				createAt 
				lastUpdate 
				schoolId 
				promotionName 
			  }
			  getBills ( pupilId : $pupilId, promotionId : $promotionId ){
				destinator
				emittor
				payer {
				  _id
				  personals{
					username
					middlename
				  }
				}
				date
				cost
				promotionId
			  }
			}
			`;	
			const PAY_BILL = gql`
				mutation onPayBills($emittor : String,$destinator : String ,$payer : String ,$cost : Int,$promotionId : String){
					  onPayBills(emittor :$emittor, destinator :$destinator , payer :$payer ,cost : $cost,promotionId :$promotionId){
						destinator
						emittor
						date
						cost
					  }
					}
				`;
		let schoolId = localStorage.getItem("schoolId");
		let pupilId = localStorage.getItem("userId");
		let pOwnerId = localStorage.getItem("promotionId");
		let payer = localStorage.getItem("userId");
		let emittor = localStorage.getItem("userId");
		
		let { devise,destinator,cost,promotionId } = this.state.fields;
		return (
			<Query query={GET_PROMOTION_BY_SCHOOL} variables={{ schoolId,pupilId, promotionId : pOwnerId}}>
				{({ data :{ getPromotionBySchool, getBills },loading, error})=>{
					if (loading || !getPromotionBySchool ||!getBills) {
						return (<Loading />);
					  }
					  return (<div>
					<div className="top-bar">
						<label className="sort-teachers-label">Sort by</label>
					</div>
					<div className="core-courses">
						<div className="one-field">
							<div>
								<label forHtml="pays">Promotion </label>
								<select name="pays" id="promotionId" value={this.state.fields.promotionId}
										onChange={this.handlerInputChange}>
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
								<input name="cost" type="number" value={this.state.fields.cost} onChange={this.handlerInputChange}/>
							</div>
							<div>
								<label forHtml="devise">Devise </label>
								<select name="devise" id="devise" value={this.state.fields.devise} onChange={this.handlerInputChange}>
									<option value="CDF">CDF</option>
									<option value="$">Dollars amercian</option>
									<option value="euro">euro</option>
								</select>
							</div>
							<Mutation mutation={PAY_BILL} >
							{(onPayBills, { data })=>{
								return (<button className="btn" onClick={(e) => {
										  onPayBills({ variables: { emittor , destinator ,payer ,
															cost : parseInt(cost), promotionId ,devise
														}});
										}}>
										<i className="fa fa-tags"/><span className="text-button">Pay</span>
									</button>)
							}}
							</Mutation>
						</div>
					</div>
					<div className="bills-main-frame">
						<div className="tittle-billing">
							Billing
							<span className="save-bill"><i className="fa fa-plus"/></span>
						</div><hr/>
						{getBills.map((bill)=>(<div>
											<div className="date-billing">{bill.date}</div><hr/>
											<div className="summary-bill">
												<span className="owner-bill">
													<Link to="cv/5cdf094ac1beac0fcc851fe6">
														{bill.payer.personals.username}{' '}{bill.payer.personals.middlename}
													</Link>
												</span>
												 pay {bill.cost} For 
												<span className="destinator-bill">
													<Link to={`cv/${bill.payer.personals._id}`}>current user</Link>
												</span>
											</div><hr/>
									</div>))}
					</div>
				 </div>)}}
			</Query>);
		}
	}