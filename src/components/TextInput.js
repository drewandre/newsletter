import React from 'react';

const TextInput = props => {
	return (
		<input
			autoComplete="off"
			name={props.name}
			placeholder={props.placeholder}
			autoFocus={props.autoFocus}
			onChange={props.handlerFunction}
			className={props.className}
			type={props.inputType}
			value={props.value}
		/>
	);
};

TextInput.defaultProps = {
	inputType: 'text',
	className: 'credentials',
	autoComplete: 'off'
};

export default TextInput;
