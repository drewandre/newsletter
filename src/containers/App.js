import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CubeGrid } from 'better-react-spinkit';

export default class App extends Component {
	constructor() {
		super();
		this.state = { loading: false };
		this.startLoader = this.startLoader.bind(this);
	}

	startLoader(click) {
		this.setState({ loading: !this.state.loading });
	}

	render() {
		return (
			<div>
				{this.state.loading ? (
					<div className="sign-up">
						<CubeGrid id="spinner" size={100} color="#6F6F6F" />
					</div>
				) : (
					<div className="sign-up">
						<a
							href="/auth/spotify"
							id="spotify-button"
							onClick={this.startLoader}
						>
							SIGN UP THROUGH SPOTIFY
						</a>
						<Link id="soundcloud-button" to="/" onClick={this.startLoader}>
							SIGN UP THROUGH SOUNDCLOUD
						</Link>
						<Link id="email-button" to="/subscribe">
							SIGN UP THROUGH EMAIL
						</Link>
					</div>
				)}
			</div>
		);
	}
}
