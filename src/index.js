import React from 'react';
import { render } from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import App from './containers/App';
import RegisterForm from './containers/RegisterForm';
import SpotifyForm from './containers/SpotifyForm';
import SoundCloudForm from './containers/SoundCloudForm';
import '../lib/app/assets/app.scss';
import '../lib/app/public/javascript/app.js';

document.addEventListener('DOMContentLoaded', () => {
	let reactElement = document.getElementById('root');
	if (reactElement) {
		render(
			<Router>
				<Switch>
					<Route exact path="/subscribe" component={RegisterForm} />
					<Route exact path="/" component={App} />
				</Switch>
			</Router>,
			reactElement
		);
	}
});
