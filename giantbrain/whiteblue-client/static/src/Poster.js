import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import Editor from 'draft-js-plugins-editor';
import { EditorState,RichUtils } from 'draft-js';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import 'whatwg-fetch';
import 'babel-polyfill';
import mentions from './mentions.js';

	const hashtagPlugin = createHashtagPlugin();
	const mentionPlugin = createMentionPlugin();
	const { MentionSuggestions } = mentionPlugin;

	const linkifyPlugin = createLinkifyPlugin({
	  component: (props) => (
	    // eslint-disable-next-line no-alert, jsx-a11y/anchor-has-content
	    <a {...props} onClick={() => alert('Clicked on Link!')} />
	  )
	});

	const plugins = [hashtagPlugin,mentionPlugin,linkifyPlugin];

	
export default class Poster extends React.Component {
						     	
		constructor(props){
				super(props);
				this.state = {
					editorState : EditorState.createEmpty(),
					suggestions : mentions
				};
				this.onChange = (editorState) => this.setState({ editorState });
				this.handleKeyCommand = (command) => { 
						const newstate = RichUtils.handleKeyCommand(this.state.editorState,command);
						if(newstate){
							this.onChange(newstate);
							return 'handler';
						}
						return 'not handler';
				 };
				this.focusEditor = () => {
				      if (this.editor) {
				        this.editor.focus();
				      }
				    };

			}			     		
		
		componentDidMount() {
			this.focusEditor();
		  }
		render(){
				let fieldsToSubscribe = [{
					
				}];

				return (<div className="over-frame-modal" >
							<div className="poster-content-modal" >
							 <div className="wit-frame">
								 <div className="wit-header">
									Express your idea, tell to others yours thinks...
									<span className="poster-close">
										<button className="btn"  onClick={() => this.props.togglePosterProps()}>
											<i  className="fa fa-remove"/>
										</button>
									</span>
								 </div><hr/>
									<div className="wit-core">
										<div className="wit-flex-box">
											<div className="poster-editor"  onClick={this.focusEditor}>
												<Editor
													  ref={this.setEditor}
													  editorState={this.state.editorState}
													  onChange={this.onChange}
													  handleKeyCommand={this.handleKeyCommand}
													  plugins={plugins}
												/>
											</div>
										</div>
										<span className="wit-authors">
										  By 
											<Link to="/cv"  className="home-btn" >
											  <span className="author-text">Becky Gordon</span>
											</Link>
										</span>
								  </div><hr/>
								  <div className="group-btn-wit">
									<button className="btn">
										<i className="fa fa-thumbs-o-up"/>
									</button>
									<button className="btn">
										<i className="fa fa-heart-o"/>
									</button>
									<label htmlFor="uploadFile"><i className="fa fa-file-image-o"/></label>
									<input name="uploadFile" className="input-file" type="file" placeholder="password..."/>
										
									<button className="btn">
										
									</button>
									<button className="btn">
										<i className="fa fa-file-movie-o"/>
									</button>
									<button className="btn" onClick={() => this.props.togglePosterProps()}>
										<i className="fa fa-paper-plane-o"/><span className="text-button">Post</span>
									</button>
									<button className="btn">
										<i className="fa fa-share"/><span className="text-button">Share</span>
									</button>
								  </div>
								</div>
							</div>
						</div>);
				}
		}