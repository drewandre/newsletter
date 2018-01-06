import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SoundCloudForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="sign-up">
				SoundCloud form here
				<Link to="/">BACK</Link>
			</div>
		);
	}
}

export default SoundCloudForm;
