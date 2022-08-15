import React from 'react';
import ListComments from './ListComments.js';

export default class Post extends React.Component {

	constructor() {
		super();
		this.state = {
			arrayComments: [],
			totalLike: 0
		};
		this.likePost = this.likePost.bind(this);
	}

	likePost() {
		const t_Like = this.state.totalLike + 1;
		this.setState(function (prevState, props) {
			totalLike: t_Like;
		});
	}

	componentDidMount() {
		this.setState({
			arrayComments: this.props.content.comments,
			totalLike: this.props.content.totalLike
		});
	}
	render() {
		const data = this.props.content;
		return React.createElement(
			'div',
			{ className: 'post' },
			React.createElement(
				'div',
				null,
				React.createElement('img', { className: 'pict_rounded size_profil friend_chat', src: data.Image }),
				React.createElement(
					'span',
					{ className: 'owner' },
					' ',
					data.owner,
					' '
				),
				React.createElement('span', { className: 'hours' }),
				React.createElement('hr', null)
			),
			React.createElement(
				'div',
				null,
				React.createElement('img', { className: 'picture_show', src: data.Picture })
			),
			React.createElement(
				'div',
				null,
				React.createElement(
					'a',
					{ href: '#', onClick: this.likePost },
					React.createElement('img', { className: 'react-icon right-position', src: './icon/good.jpg' })
				),
				React.createElement(
					'a',
					{ href: '#', onClick: this.likePost },
					React.createElement('img', { className: 'react-icon right-position', src: './icon/lovetoo.jpg' })
				),
				React.createElement(
					'span',
					{ className: 'owner left-position' },
					' ',
					data.totalComments,
					' '
				),
				React.createElement(
					'span',
					{ className: 'owner left-position' },
					' ',
					data.totalLike,
					' '
				)
			),
			React.createElement('hr', null),
			React.createElement(ListComments, { feedbacks: this.state.arrayComments }),
			React.createElement(
				'div',
				{ className: 'wrap-comment' },
				React.createElement('img', { className: 'pict_rounded size_profil friend_chat', src: data.Image }),
				React.createElement(
					'form',
					{ name: 'commentForm', action: '/textform' },
					React.createElement('input', { type: 'text', name: 'commentInput', className: 'comment_input shift_zone_text no-border', placeholder: 'votre commentaire' })
				)
			)
		);
	}
}