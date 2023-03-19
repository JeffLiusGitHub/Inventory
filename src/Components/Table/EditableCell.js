import React, { useState } from 'react';
const EditableCell = ({
	value: initialValue,
	row: { index, depth, id: rowId },
	column: { id },
	updateMyData,
}) => {
	const [value, setValue] = useState(initialValue);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const onBlur = () => {
		updateMyData(index, id, value, depth, rowId);
	};

	React.useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

export default EditableCell;
