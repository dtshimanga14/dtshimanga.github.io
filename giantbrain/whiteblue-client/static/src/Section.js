
import React from 'react';
import { Link } from 'react-router-dom';

	
	export default class Section extends React.Component {
				constructor(props){
					super(props);
					this.state = {
						viewerState : false,
					  };
					this.handlerViewerState = this.handlerViewerState.bind(this);
				}
				handlerViewerState(){
					this.setState({
						viewerState : !this.state.viewerState
					});
				}
				render(){
					return (
						<div>
							<div className="portion-header" onClick={()=> this.handlerViewerState()}>
								{this.props.portion.tittle} <i className="show fa fa-ellipsis-h"/>
							</div>
							<div className="paragraph-indent">{
								this.props.portion.paragraphs.map((paragraph) => {
									if(paragraph.type == 'text'){
										return (<div>
													{this.state.viewerState ?(<p className="paragraph-article">
														{paragraph.content}
													</p>):null}
												</div>);
									}else if(paragraph.type == 'list'){
										return (<div>
													{this.state.viewerState ?(<ol>
																				{paragraph.list.map(l => <li>{l}</li>)}
																			</ol>)
													:null}
												</div>);
									}else if(paragraph.type == 'image'){
										return (<div>
													{this.state.viewerState ?(<img src={paragraph.source}/>):null}
												</div>);
									}else if(paragraph.type == 'equation'){
										return (<div>
													{this.state.viewerState ?(<div>{paragraph.equation}</div>):null}
												</div>);
									}else{
										return (<div/>);
									}
								})
							}
							</div>
						</div>
					);
				}	
			
		}