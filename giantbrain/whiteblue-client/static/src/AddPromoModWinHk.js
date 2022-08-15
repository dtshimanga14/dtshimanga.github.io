import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import moment from 'moment';
import 'whatwg-fetch';
import 'babel-polyfill';

	
import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';

import { ADD_PROMOTION_MUT } from './mutations.js';
//import { GET_PROFIL } from './subscriptions.js';
import { PROMOTIONS_SCHOOL } from './queries.js';

const AddPromoModWinHk = ({ toggleAddPromotion, schoolId }) => {
	
	const [name, setName] = useState("");//promotionName
	const [orientation, setOrientation] = useState("");//orientationName
	const [level, setLevel] = useState("");//promotionLevel
	const [prevouisPromotion, setPrevouisPromotion] = useState("");//promotionLevel
	let scheduleId = "5dc7fa8e6e1";
	
	const resetForm = (event)=> {// handlerOnSubmit
		setName("");
		setOrientation("");
		setLevel("");
	};
	
	const [ addPromotionToSchool ] = useMutation(ADD_PROMOTION_MUT);
	
	const { loading, error, data } = useQuery(PROMOTIONS_SCHOOL,{ 
				variables: { schoolId }
			});
	  if (loading) return (<div>'Loading...'</div>);
	  if (error) return `Error! ${error.message}`;
  
	let {  getPromotionBySchool } = data;
	return(<div>
			<div className="over-frame-modal"/>
			<div className="subscription-form-frame" >
				<form  onSubmit={() => {
					event.preventDefault();
					addPromotionToSchool({ variables: { 
						schoolId , promotionName :  name             	,
						orientationName : orientation,
						promotionLevel : level, scheduleId ,
						prevouisPromotion
					}});
					resetForm();
				}}>
				<div>
					<input name="promotionName" className="form-label" 
						type="text" placeholder="promotion name..." 
						value={name}
						onChange={(e)=> setName(e.target.value)}
					/>
				</div>
				<div>{prevouisPromotion} {level} {orientation} {name} {orientation}</div>
				<div>
					<input name="orientationName" className="form-label" 
						type="text" placeholder="orientation name..." 
						value={orientation}
						onChange={(e)=> setOrientation(e.target.value)}
					/>
				</div>
				<div>
					<label Htmlfor="promotionLevel">Level </label>
					<select 
						name="promotionLevel" id="pays" value={level} 
						onChange={(e)=> setLevel(e.target.value)}
					>
					{["First Graduate","Second Graduate","Third Graduate","First Master","Second Master"]
						.map((level)=>(<option value={level}>
											{level}
										</option>)
						)}
					</select>
				</div>
				<div>
					<label Htmlfor="promotionLevel">Prevouis promotion </label>
					<select name="promotionLevel" 
						id="pays" 
						value={prevouisPromotion}
						onChange={(e)=> setPrevouisPromotion(e.target.value)}
					>
					{getPromotionBySchool
						.map((promotion)=>(<option value={promotion._id}>
							{promotion.promotionName}
						</option>))}
					</select>
				</div>
				<div>
					<button className="btn"  onClick={toggleAddPromotion}>
						Previous
					</button>
					<input type="submit" className="btn" />
				</div>
				</form>
			</div>	
		</div>);
};
	
export default AddPromoModWinHk;

	
	