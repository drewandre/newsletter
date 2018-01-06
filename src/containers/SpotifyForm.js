import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SpotifyForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="sign-up">
				Spotify form here
				<Link to="/">BACK</Link>
			</div>
		);
	}
}

export default SpotifyForm;
