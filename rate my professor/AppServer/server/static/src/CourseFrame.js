import React, { Component } from 'react';
import { EditorState,convertFromRaw, convertToRaw  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import './css/react-draft-wysiwyg.css';


export default class CourseFrame extends Component {
  constructor(props) {
    super(props);
    const contentState = EditorState.createWithContent(
		convertFromRaw({
			"entityMap":{},
			"blocks":[
				{
					"key":"637gr",
					"text":"Initialized from content state.",
					"type":"unstyled",
					"depth":0,
					"inlineStyleRanges":[{
					  "offset": 0,
					  "length": 11,
					  "style": "BOLD"
					},],
					"entityRanges":[],
					"data":{}
				}]
			})
		);
    this.state = {
      editorState : contentState,
    };
  }
  render() {
    const { editorState } = this.state;
	const formFields = {};
    return (
		<div className="editor-css">
		  <Editor
			toolbarHidden
			wrapperClassName="wrapper-class"
			editorClassName="editor-class"
			toolbarClassName="toolbar-class"
			editorState={editorState}
			onBlur={(event, editorState) => {}}
			onEditorStateChange={
				(editorState) => {
					const converted = convertToRaw(editorState);
					formFields.content = converted;
					this.setState({
					  editorState,
					});
				  }}
			
			mention={{
			  separator: ' ',
			  trigger: '@',
			  suggestions: [
				{ text: 'APPLE', value: 'apple', url: 'apple' },
				{ text: 'BANANA', value: 'banana', url: 'banana' },
				{ text: 'CHERRY', value: 'cherry', url: 'cherry' },
				{ text: 'DURIAN', value: 'durian', url: 'durian' },
				{ text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
				{ text: 'FIG', value: 'fig', url: 'fig' },
				{ text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
				{ text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
			  ],
			}}
			hashtag={{
			  separator: ' ',
			  trigger: '#',
			}}
		  />
		</div>
    )
  }
}

