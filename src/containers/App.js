import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="sign-up">
				<a href="/auth/spotify" id="spotify-button">
					SIGN UP THROUGH SPOTIFY
				</a>
				<Link id="soundcloud-button" to="/soundcloud">
					SIGN UP THROUGH SOUNDCLOUD
				</Link>
				<Link id="email-button" to="/subscribe">
					SIGN UP THROUGH EMAIL
				</Link>
			</div>
		);
	}
}
