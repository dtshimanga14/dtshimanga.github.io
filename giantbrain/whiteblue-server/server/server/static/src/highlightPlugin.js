import React from 'react';
import ReactDOM from 'react-dom';
import { RichUtils } from 'draft-js';

export default () => {
		return {
			customStyleMap : {
				'HIGHLIGHT': {
			      background: '#fffe0d'
			     }
			 },
			 keyBindingFn : (e) =>  {
			 	if(e.metaKey && e.key ==='h'){
			 		return 'highlight';
			 	}
			 },
			 handlekeyCommand :(command,editorState,{setEditorState}) =>  {
			 		if(command === 'highlight'){
			 			setEditorState(
			 				RichUtils.toggleInlineStyle(editorState,'HIGHLIGHT')
			 			);
			 			return true
			 		}
			 	}
		}
};