import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EmailForm from './EmailForm';
import SpotifyForm from './SpotifyForm';
import SoundCloudForm from './SoundCloudForm';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="sign-up">
				<Link id="email-button" to="/email">
					SIGN UP THROUGH EMAIL
				</Link>
				<Link id="spotify-button" to="/spotify">
					SIGN UP THROUGH SPOTIFY
				</Link>
				<Link id="soundcloud-button" to="/soundcloud">
					SIGN UP THROUGH SOUNDCLOUD
				</Link>
			</div>
		);
	}
}
