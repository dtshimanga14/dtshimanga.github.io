
import React from 'react';
import { Link } from 'react-router-dom';

	
	export default class Option extends React.Component {
				constructor(props){
					super(props);
          this.state = {
            articleCaretState : false,
          };
          this.handlerArticleCaret = this.handlerArticleCaret.bind(this);
				}
        handlerArticleCaret(){
          this.setState({
            articleCaretState : !this.state.articleCaretState,
          });
        }
				render(){
					return (
                <div className="single-option">
                  <div className="article-caret" onClick={() => this.handlerArticleCaret()}>
                    <span>
                      {this.state.articleCaretState ? 
                        (<i className="fa fa-caret-down"/>):
                        (<i className="fa fa-caret-right"/>)
                      }
                    </span>
                  {this.props.tittle}
                  </div>
                  {this.state.articleCaretState ? 
                    (<div className="article-list">
                        {this.props.Articles
                                  .map(article =><div>{article.tittle}</div>)
                        }
                    </div>):null
                  }
                </div>
					);
				}	
			
		}