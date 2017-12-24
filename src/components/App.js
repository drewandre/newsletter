import React from 'react';
import PropTypes from 'prop-types';

import '../../lib/app/assets/styles/App.scss';

const App = ({ name }) => {
	return <h1>Hello, {name}!</h1>;
};

App.propTypes = {
	name: PropTypes.string
};

export default App;
