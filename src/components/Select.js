import React from 'react';

const Select = props => {
	let optionElements = props.options.map(option => {
		return (
			<option key={option} value={option}>
				{option}
			</option>
		);
	});

	return (
		<select
			className={props.className}
			name={props.name}
			value={props.selectedOption}
			onChange={props.handlerFunction}
		>
			<option value="" disabled selected>
				{props.placeholder}
			</option>
			{optionElements}
		</select>
	);
};

Select.defaultProps = {
	className: 'credentials'
};

export default Select;
