import React from 'react';

const TextInput = props => {
	return (
		<input
			id={props.error ? 'error' : null}
			autoComplete="off"
			name={props.name}
			placeholder={props.placeholder}
			autoFocus={props.autoFocus}
			onChange={props.handlerFunction}
			className="credentials"
			maxLength={props.maxLength}
			type={props.inputType}
			value={props.value}
		/>
	);
};

TextInput.defaultProps = {
	inputType: 'text',
	className: 'credentials',
	autoComplete: 'off',
	maxLength: '-1'
};

export default TextInput;
