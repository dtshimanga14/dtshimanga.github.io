import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import 'whatwg-fetch';
import 'babel-polyfill';

	const CREATE_SCHOOL = gql`
			mutation addInstitut($username: String,$firstname: String,
								$password: String, $middlename: String,$schoolName : String,
								$StateCountry: String, $town: String,$country:String,
								$email : String,$township : String,
								$street : String,$number : String,
								$reference : String,$latitude : Int,
								$longitude : Int,$altitude : Int
							) {
				addInstitut(input:{
								username: $username,firstname: $firstname,
								password: $password, middlename: $middlename,schoolName : $schoolName,
								StateCountry: $StateCountry, town: $town,
								country:$country,email : $email,
								township : $township,street : $street,
								number : $number,reference : $reference ,
								latitude : $latitude,longitude : $longitude,
								altitude : $altitude
			  }){
				  fonder
				  name
				  logo
				 }
			}
			`;
	
export default class SchoolSubscriber extends React.Component {
						     	
		constructor(props){
				super(props);
				this.state = {
					fields : {
						username : "",
						firstname : "",
						middlename : "",
						password : "",
						email : "",
						schoolName : "",
						country : "",
						StateCountry : "",
						town : "",
						number : "",
						reference : "",
						latitude : 0, 
						longitude : 0, 
						altitude : 0,
					},
				};
				this.handlerOnSubmit = this.handlerOnSubmit.bind(this);
				this.handlerInputChange = this.handlerInputChange.bind(this);
				this.getLocation = this.getLocation.bind(this);
			}
		getLocation(){
			let x = document.getElementById("loc");
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position)=>(
					x.innerHTML = "Latitude: " + position.coords.latitude +"<br>Longitude: " + position.coords.longitude
				));
			  } else {
				x.innerHTML = "Geolocation is not supported by this browser.";
			  }
		}
		handlerInputChange(event){
			const fields = this.state.fields;
			fields[event.target.name] = event.target.value;
			this.setState({ fields });
		}
		handlerOnSubmit(event){
			this.setState({
				fields : {
						username : "",
						firstname : "",
						middlename : "",
						password : "",
						email : "",
						schoolName : "",
						country : "",
						state : "",
						town : "",
						number : "",
						reference : "",
						latitude : 0, 
						longitude : 0, 
						altitude : 0,
					},
			});
		}
		render(){

					return (
				<Mutation mutation={CREATE_SCHOOL}>
				{(addInstitut,{ data })=>{
					return(
						<div>
							<div className="over-frame-modal"/>
							<div className="subscription-form-frame" >
							
							
							<div className="subscription-wit-frame">
							<input type="button" className="btn" value="previous" onClick={
								()=>this.props.showSubscriptionModalWindows()
							}/>
								<form  onSubmit={() => {
									event.preventDefault();
									addInstitut({ variables: { 
													username : this.state.fields.username,
													firstname : this.state.fields.firstname,
													middlename : this.state.fields.middlename,
													password : this.state.fields.password,
													schoolName : this.state.fields.schoolName,
													StateCountry: this.state.fields.StateCountry, 
													town: this.state.fields.town,
													country : this.state.fields.country,
													email : this.state.fields.email,
													township : this.state.fields.township,
													street : this.state.fields.street,
													number : this.state.fields.number,
													reference : this.state.fields.reference,
													latitude : this.state.fields.latitude,
													longitude : this.state.fields.longitude,
													altitude : this.state.fields.altitude,
											}
									});
									this.handlerOnSubmit();
								}}>
									<div className="wit-header">
										Formulaire d'inscription
									</div><hr/>
									<div className="subscription-wit-core">
										<div className="couple-label-input">
											<div className="label-div-input"><label >Username</label></div>
												<input 
													name="username" 
													className="" 
													type="text" 
													placeholder="username..."
													value={this.state.fields.username}
													onChange={this.handlerInputChange}
												/>
											</div>
											<div className="couple-label-input">
												<label >Firstname</label>
												<input 
													name="firstname" 
													className="" 
													type="text" 
													placeholder="firstname..."
													value={this.state.fields.firstname}
													onChange={this.handlerInputChange}/>
											</div>
											<div className="couple-label-input">
												<label >Middlename</label>
												<input 
													name="middlename" 
													className="" 
													type="text" 
													placeholder="middlename..."
													value={this.state.fields.middlename}
													onChange={this.handlerInputChange}
												/>
											</div>
											<div className="couple-label-input">
												<label >Password</label>
												<input 
													name="password" 
													className="" 
													type="password" 
													placeholder="password..."
													value={this.state.fields.password}
													onChange={this.handlerInputChange}/>
											</div>
											<div className="couple-label-input">
												<label >School name</label>
												<input 
													name="schoolName" 
													className="" 
													type="text" 
													placeholder="school name..." 
													value={this.state.fields.schoolName}
													onChange={this.handlerInputChange}
												/>
											</div>
											<div className="couple-label-input">
												<label >Country</label>
												<input 
													name="country" 
													className="" 
													type="text" 
													placeholder="country..."
													value={this.state.fields.country}
													onChange={this.handlerInputChange}
												/>
											</div>
											<div className="couple-label-input">
												<label >State</label>
												<input 
													name="State" 
													className="" 
													type="text" 
													placeholder="state..."
													value={this.state.fields.StateCountry}
													onChange={this.handlerInputChange}
												/>
											</div>
											<div className="couple-label-input">
												<label >Town</label>
												<input 
													name="town" 
													className="" 
													type="text" 
													placeholder="town..."
													value={this.state.fields.town}
													onChange={this.handlerInputChange}
												/>
											</div>
											<div className="couple-label-input">
												<label >Street</label>
												<input 
													name="street" 
													className="" 
													type="text" 
													placeholder="street" 
													value={this.state.fields.street}
													onChange={this.handlerInputChange}
												/>
											</div>
											<div className="couple-label-input">
												<label >Township</label>
												<input 
													name="township" 
													className="" 
													type="text" 
													placeholder="township..." 
													value={this.state.fields.township}
													onChange={this.handlerInputChange}
												/>
											</div>
											<div className="couple-label-input">
												<label >Numbers</label>
												<input 
													name="number" 
													className="" 
													type="text" 
													placeholder="number..." 
													value={this.state.fields.number}
													onChange={this.handlerInputChange}
												/>
											</div>
											<div className="couple-label-input">
												<label >References</label>
												<input 
													name="reference" 
													className="" 
													type="text" 
													placeholder="reference..." 
													value={this.state.fields.reference}
													onChange={this.handlerInputChange}
												/>
											</div>
											<div className="couple-label-input">
												<label >E-mail</label>
												<input 
													name="email" 
													className="" 
													type="email" 
													placeholder="e-mail..." 
													value={this.state.fields.email}
													onChange={this.handlerInputChange}
												/>
											</div>
											<div className="couple-label-input">
												<input name="loc" 
													type="button" className="btn" value="Localiser"
													onClick={this.getLocation}
												/>
												<label id="loc"/>
											</div>
									  </div><hr/>
									  <div className="group-btn-wit">
										<input type="submit" className="btn" />
										<input type="button" className="btn" value="previous" />
									  </div>
							</form>
						</div>
					</div>
				</div>
					);
				}}
				</Mutation>
				);
			}
		}