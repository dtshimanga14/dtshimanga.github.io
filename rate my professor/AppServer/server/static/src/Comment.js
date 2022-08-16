import React from 'react';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Editor from 'draft-js-plugins-editor';
import { EditorState,RichUtils } from 'draft-js';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
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

	export default class Comment extends React.Component {
			constructor(props){
				super(props);
				this.state = {
					editorState : EditorState.createEmpty(),
					suggestions : mentions
				};
				this.onSearchChange = ({value}) => { 
						this.setState({
							suggestions : defaultSuggestionsFilter(value,mentions)
						});
				 };
				this.onItalicClick = this.onItalicClick.bind(this);
				this.onBoldClick = this.onBoldClick.bind(this);
				this.onUnderlineClick = this.onUnderlineClick.bind(this);
				this.onToggleCode = this.onToggleCode.bind(this);
				this.onChange = (editorState) => this.setState({ editorState });
				this._onTab = (e) => this._onTab(e);
				this.setEditor = (editor) => { this.editor = editor; };
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
			_onTab(e){
				const maxDepth = 4;
				this.onChange(RichUtils.onTab(e,this.state.editorState,maxDepth));
			}
			onUnderlineClick(){
				this.onChange(
					RichUtils.toggleInlineStyle(this.state.editorState,'UNDERLINE')
				);
			}
			onItalicClick () { 
			 		this.onChange(
			 			RichUtils.toggleInlineStyle(this.state.editorState,'ITALIC')
			 		);
				  }
			onBoldClick () { 
				this.onChange(
						RichUtils.toggleInlineStyle(this.state.editorState,'BOLD')
					);
			 	alert('hello world');
				 }
			componentDidMount() {
			    this.focusEditor();
			  }
			 onToggleCode ()  {
			 	this.onChange(RichUtils.toggleCode(this.state.editorState));
			 	alert('hello world');
			 }
			render (){
				return (
			                 	 <div className="editor-comment-css" onClick={this.focusEditor}>
									<Editor
								          ref={this.setEditor}
								          editorState={this.state.editorState}
								          onChange={this.onChange}
								          handleKeyCommand={this.handleKeyCommand}
								          plugins={plugins}
								        />
								        <MentionSuggestions
								        	onSearchChange={this.onSearchChange}
								        	suggestions={this.state.suggestions}
								        />
			                  	</div>
					);
			}
		}
