import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';
import 'whatwg-fetch';
import moment from 'moment';
import 'babel-polyfill';
import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient, useSubscription, useMutation } from '@apollo/client';

import './css/MyClassmate.css';
 
import Loading from './Loading.js';

import { GET_ASSESSES_TO_CORRECT } from './queries.js';
import { CORRECT_ASSESS } from './mutations.js';

const CorrectorHk = ({ toggleFrame }) =>{ 

	let promotionId = "5dda49065232b51c88da601e"//
	let teacherId = "5dd83d6db770581478f9b273";//localStorage.getItem('user-token');
	
	const { loading, error, data, fetchMore } = useQuery(GET_ASSESSES_TO_CORRECT,{ 
				variables: { promotionId, teacherId }
			});
  
  const [ onBulkCorrection ] = useMutation(CORRECT_ASSESS);
  
  if (loading) return (<div>'Loading...'</div>);
  if (error) return `Error! ${error.message}`;
	let { onGetAssessToCorrect } = data;
	
	return(
		<div className= "assess-zone">
				<div className= "assess-header-zone">
					Assessments
					<button className="btn"onClick={toggleFrame}>
						<i className="fa-ellipsis-h"/>
					</button>
				</div><hr/>
				<div className= "assesses">
					{onGetAssessToCorrect.map((assessOne) => {
						return (<div className="assess_menu">
									<span className="assess-topic">{assessOne.header}</span>
								{assessOne.corrected ? 
									(<div>
										statistic
									</div>) : 
									(<button onClick={()=>{
										alert(assessOne._id);
										onBulkCorrection({ variables: {
											assessId: assessOne._id 
										}})
									}}>
											Correct
									</button>)}
									<div>
										<span className="assess-course"><i className="fa fa-folder-o"/>{assessOne.courseId.name}</span><br/>	
										<span className="assess-release-hour"> Publish at  </span> 
										<span className="text-align lower-case">{assessOne.startDay}</span>	
										<span className="assess-finish-hour">limit at  </span>
										<span className="text-align lower-case">{assessOne.endDay}</span>	
										<span className="assess-finish-hour">limit at  </span>
										<span className="text-align lower-case">{assessOne.duration}</span>	
									</div>
								<hr/>
							</div>)
					})}
				</div>
	</div>
	);
};

export default CorrectorHk;
	
		



