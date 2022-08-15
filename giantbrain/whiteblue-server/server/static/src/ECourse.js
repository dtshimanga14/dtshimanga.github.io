import React from 'react';
import ReactDOM from 'react-dom';
import { Link} from 'react-router-dom';
import gql from 'graphql-tag';
import moment from 'moment';
import { Query, Mutation } from 'react-apollo';
import 'whatwg-fetch';
import { EditorState,convertFromRaw, convertToRaw  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import './css/react-draft-wysiwyg.css';


export default class ECourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }
  render() {
	const GET_COURSE = gql`query ($id: String!){
							  getCourses(id: $id) {
								blocks {
								  key
								  text
								  type
								  depth
								  inlineStyleRanges {
									offset
									length
									style
								  }
								  entityRanges {
									offset
									length
									key
								  }
								  data {
									id
								  }
								}
							  }
							}`;	
    const { editorState } = this.state;
	const formFields = {};
	const id ="q,fn!qf,";
    return (<Query query={GET_COURSE} variables={{ id }}>
					{({ data: { getCourses }, loading }) => {
					  if (loading || !getCourses) {
						return <div>Loading ...</div>;
					  }
					const editorState = EditorState.createWithContent(convertFromRaw(getCourses));
					  return (
						<div className="editor-css">
						  <Editor
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
							ReadOnly={false}
						  />
						</div>);
					}}
				  </Query>
				);
  }
}

