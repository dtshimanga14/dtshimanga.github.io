import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import moment from 'moment';
import 'whatwg-fetch';
import 'babel-polyfill';

	
import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';

import { ADD_MANUSCRIT } from './mutations.js';
//import { GET_PROFIL } from './subscriptions.js';
import { PROMOTIONS_SCHOOL } from './queries.js';

const AddCoursesModWinHk = ({ toggleAddCourse, schoolId, promotions }) => {
	
	const [tittle, setTittle] = useState("");//promotionName
	const [promotionId, setPromotionId] = useState("");//promotionLevel
	let teacherId = "none";
	let Content = "none"; 
	
	const resetForm = (event)=> {// handlerOnSubmit
		setTittle("");
		setPromotionId("");
	};
	
	const [ onMakeManuscrit ] = useMutation(ADD_PROMOTION_MUT);
	
	return(<div>
			<div className="over-frame-modal"/>
			<div className="subscription-form-frame" >
				<form  onSubmit={() => {
					event.preventDefault();
					onMakeManuscrit({ variables: { 
						promotionId, tittle, teacherId, Content 
					}});
					resetForm();
				}}>
				<div>
					<input name="orientationName" className="form-label" 
						type="text" placeholder="course tittle..." 
						value={tittle}
						onChange={(e)=> setTittle(e.target.value)}
					/>
				</div>
				<div>
					<label Htmlfor="promotionLevel">Promotion </label>
					<select name="promotionLevel" 
						id="pays" 
						value={promotionId}
						onChange={(e)=> setPromotionId(e.target.value)}
					>
					{promotions
						.map((promotion)=>(<option value={promotion._id}>
							{promotion.promotionName}{", "}{promotion.promotionLevel}
						</option>))}
					</select>
				</div>
				<div>
					<button className="btn"  onClick={toggleAddCourse}>
						Previous
					</button>
					<input type="submit" className="btn" />
				</div>
				</form>
			</div>	
		</div>);
};
	
export default AddCoursesModWinHk;

	
	