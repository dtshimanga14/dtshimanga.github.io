import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';

export default class Chapter extends React.Component {
						     		
		constructor(props){
				super(props);
				this.state = {
					showContent : false,
				};
				this.showSections = this.showSections.bind(this);
		}
		showSections(chapter){
			this.setState({
				showContent : !this.state.showContent
			});
			this.props.onChangeChapter(chapter);
		}
		render(){
					return (<div>
                              <div className="tab-chapter-head" onClick={alert(props.key)}>
								{this.props.chapter.tittle}
                              </div>
                        </div>)
		}
	}