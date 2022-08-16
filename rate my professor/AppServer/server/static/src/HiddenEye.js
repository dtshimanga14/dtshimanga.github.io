import React from 'react';
import ReactDOM from 'react-dom';




	export default class HiddenEye extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				eyeIconState : false,
				statusState : "Delete",
			};
			this.toggleViewerStatus = this.toggleViewerStatus.bind(this);
			this.toggleAddViewer = this.toggleAddViewer.bind(this);
		}
		toggleViewerStatus(){
			 
				this.setState( prevSate =>{
					return {
						eyeIconState : !prevSate.eyeIconState,
					};
				});
			
		}
		toggleAddViewer(){
			this.setState({
				statusState : "add"
			});
		}
		render(){
			return (<div className="cert-user-panel">
						<span>
							<button className="btn user-cert-status"  onClick={()=> this.toggleViewerStatus()}>
								{
									this.state.eyeIconState ?(<i className="fa fa-eye" />)
									:(<i className="fa fa-eye-slash" />)
								}
							</button>
						</span>
						<span>
							<button className="btn user-cert-status">
								<i className="fa fa-user-times" />
							</button>
						</span>
					</div>
				);
			}	
		}