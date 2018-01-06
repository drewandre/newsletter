import React from 'react';

const TextInput = props => {
	return (
		<input
			id="form-input"
			autoComplete="off"
			name={props.name}
			placeholder={props.placeholder}
			autoFocus={props.autoFocus}
			onChange={props.handlerFunction}
			className={props.className}
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
