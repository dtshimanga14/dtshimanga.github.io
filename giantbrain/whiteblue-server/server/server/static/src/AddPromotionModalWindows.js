import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query, Mutation } from "react-apollo";
import moment from 'moment';
import 'whatwg-fetch';
import 'babel-polyfill';

	
export default class AddPromotionModalWindows extends React.Component {
						     	
	constructor(props){
			super(props);
			this.state = {
				fields : {
					promotionName : "",
					orientationName : "",
					levelName : "",
				},
			};
			this.handlerOnSubmit = this.handlerOnSubmit.bind(this);
			this.handlerInputChange = this.handlerInputChange.bind(this);
		}
	handlerInputChange(event){
		const fields = this.state.fields;
		fields[event.target.name] = event.target.value;
		this.setState({ fields });
	}
		handlerOnSubmit(event){
			this.setState({
				fields : {
						promotionName : "",
						orientationName : "",
						promotionLevel : "",
					},
			});
		}
	render(){
		const ADD_PROMOTION_MUT = gql`
			mutation addPromotionToSchool($schoolId: String,$promotionName: String,
			$promotionLevel: String,$orientationName :String,$scheduleId : String){
			  addPromotionToSchool(schoolId: $schoolId,promotionName: $promotionName,
								promotionLevel: $promotionLevel,
								orientationName :$orientationName,scheduleId : $scheduleId
					){
					_id
					schoolId
					promotionName
					promotionLevel
					scheduleId
					pupils {
					  _id
					  personals {
						username
						middlename
						firstname
						picture
						description
					  }
					  lastSeenOnline
					  performance
				}
			  }
			}
			`;
			return (
			<Mutation mutation={ADD_PROMOTION_MUT}>
			{(addPromotionToSchool,{ data })=>{
				return(
					<div>
						<div className="over-frame-modal"/>
						<div className="subscription-form-frame" >
							<form  onSubmit={() => {
								event.preventDefault();
								addPromotionToSchool({ variables: { 
												schoolId : "5dd5a21099f69611cc23b4d9",
												promotionName : this.state.fields.promotionName              	,
												orientationName : this.state.fields.orientationName,
												promotionLevel : this.state.fields.promotionLevel,
												scheduleId : "5dc7fa8e6e1",
											}
									});
								this.handlerOnSubmit();
							}}>
							<div>
								<input name="promotionName" className="form-label" 
									type="text" placeholder="promotion name..." 
									value={this.state.fields.promotionName}
									onChange={this.handlerInputChange}
								/>
							</div>
							<div>
								<input name="orientationName" className="form-label" 
									type="text" placeholder="orientation name..." 
									value={this.state.fields.orientationName}
									onChange={this.handlerInputChange}
								/>
							</div>
							<div>
								<label for="promotionLevel">Level </label>
								<select name="promotionLevel" 
										id="pays" 
										value={this.state.fields.promotionLevel}
										onChange={this.handlerInputChange}
								>
								{["First Graduate","Second Graduate","Third Graduate","First Master","Second Master"]
									.map((level)=>(<option value={level}>
														{level}
													</option>)
									)}
								</select>
							</div>
							<div>
								<button className="btn"  onClick={this.props.toggleAddPromotion}>
									Previous
								</button>
								<input type="submit" className="btn" />
							</div>
							</form>
						</div>	
					</div>
				);
			}}
			</Mutation>
			);
		}
	}